import * as k8s from '@kubernetes/client-node';

export class KubernetesClient {
  private k8sApi: k8s.CoreV1Api;

  constructor() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  }

  async listServices(namespace: string = 'default') {
    try {
      const response = await this.k8sApi.listNamespacedService({namespace});
      return (response as any).body.items?.map((service: any) => ({
        name: service.metadata?.name || '',
        namespace: service.metadata?.namespace || '',
        type: service.spec?.type || '',
        clusterIP: service.spec?.clusterIP || '',
        ports: service.spec?.ports?.map((port: any) => ({
          name: port.name || '',
          port: port.port,
          targetPort: port.targetPort,
          protocol: port.protocol || 'TCP',
          nodePort: port.nodePort
        })) || [],
        selector: service.spec?.selector || {}
      })) || [];
    } catch (error) {
      throw new Error(`Failed to list services in namespace ${namespace}: ${error}`);
    }
  }

  async getServiceEndpoints(serviceName: string, namespace: string = 'default') {
    try {
      const serviceResponse = await this.k8sApi.readNamespacedService({name: serviceName, namespace});
      const endpointsResponse = await this.k8sApi.readNamespacedEndpoints({name: serviceName, namespace});

      const service = (serviceResponse as any).body;
      const endpoints = (endpointsResponse as any).body;

      const servicePorts = service.spec?.ports || [];
      const endpointAddresses = endpoints.subsets?.flatMap((subset: any) =>
        subset.addresses?.map((addr: any) => ({
          ip: addr.ip || '',
          hostname: addr.hostname,
          ports: subset.ports?.map((port: any) => ({
            name: port.name || '',
            port: port.port,
            protocol: port.protocol || 'TCP'
          })) || []
        })) || []
      ) || [];

      return {
        serviceName,
        namespace,
        serviceType: service.spec?.type || '',
        clusterIP: service.spec?.clusterIP || '',
        servicePorts,
        endpoints: endpointAddresses,
        ready: endpointAddresses.length > 0
      };
    } catch (error) {
      throw new Error(`Failed to get endpoints for service ${serviceName} in namespace ${namespace}: ${error}`);
    }
  }

  async checkServiceHealth(serviceName: string, namespace: string = 'default') {
    try {
      const endpoints = await this.getServiceEndpoints(serviceName, namespace);
      return {
        serviceName,
        namespace,
        healthy: endpoints.ready && endpoints.endpoints.length > 0,
        endpointCount: endpoints.endpoints.length,
        message: endpoints.ready
          ? `Service ${serviceName} is healthy with ${endpoints.endpoints.length} endpoints`
          : `Service ${serviceName} has no ready endpoints`
      };
    } catch (error) {
      return {
        serviceName,
        namespace,
        healthy: false,
        endpointCount: 0,
        message: `Failed to check service health: ${error}`
      };
    }
  }

  buildServiceUrl(serviceName: string, namespace: string, port: number, protocol: string = 'http'): string {
    // For cluster-internal access
    return `${protocol}://${serviceName}.${namespace}.svc.cluster.local:${port}`;
  }

  async getAllNamespaces() {
    try {
      const response = await this.k8sApi.listNamespace();
      return (response as any).body.items?.map((ns: any) => ({
        name: ns.metadata?.name || '',
        status: ns.status?.phase || '',
        labels: ns.metadata?.labels || {}
      })) || [];
    } catch (error) {
      throw new Error(`Failed to list namespaces: ${error}`);
    }
  }
}