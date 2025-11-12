import { z } from 'zod';
import { KubernetesClient } from '../utils/kubernetes.js';
// Schema for listing services
const listServicesSchema = z.object({
    namespace: z.string().optional().default('default').describe('Kubernetes namespace to list services from'),
});
// Schema for getting service endpoints
const getServiceEndpointsSchema = z.object({
    serviceName: z.string().describe('Name of the Kubernetes service'),
    namespace: z.string().optional().default('default').describe('Kubernetes namespace of the service'),
});
// Schema for checking service health
const checkServiceHealthSchema = z.object({
    serviceName: z.string().describe('Name of the Kubernetes service to check'),
    namespace: z.string().optional().default('default').describe('Kubernetes namespace of the service'),
});
// Schema for listing namespaces
const listNamespacesSchema = z.object({});
const kubernetesClient = new KubernetesClient();
// List Kubernetes services
export const listServices = {
    name: 'list_services',
    description: 'List all services in a Kubernetes namespace',
    inputSchema: listServicesSchema,
    handler: async (params) => {
        try {
            const services = await kubernetesClient.listServices(params.namespace);
            return {
                success: true,
                namespace: params.namespace,
                serviceCount: services.length,
                services: services.map((service) => ({
                    name: service.name,
                    type: service.type,
                    clusterIP: service.clusterIP,
                    ports: service.ports.map((port) => `${port.port}/${port.protocol}${port.name ? ` (${port.name})` : ''}`),
                    url: service.ports.length > 0
                        ? kubernetesClient.buildServiceUrl(service.name, service.namespace, service.ports[0].port)
                        : 'No ports available'
                }))
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                namespace: params.namespace
            };
        }
    },
};
// Get service endpoints
export const getServiceEndpoints = {
    name: 'get_service_endpoints',
    description: 'Get detailed endpoint information for a specific Kubernetes service',
    inputSchema: getServiceEndpointsSchema,
    handler: async (params) => {
        try {
            const endpoints = await kubernetesClient.getServiceEndpoints(params.serviceName, params.namespace);
            return {
                success: true,
                service: {
                    name: endpoints.serviceName,
                    namespace: endpoints.namespace,
                    type: endpoints.serviceType,
                    clusterIP: endpoints.clusterIP,
                    ready: endpoints.ready
                },
                endpoints: endpoints.endpoints.map((ep) => ({
                    ip: ep.ip,
                    hostname: ep.hostname,
                    ports: ep.ports
                })),
                urls: endpoints.servicePorts.map((port) => ({
                    port: port.port,
                    protocol: port.protocol,
                    url: kubernetesClient.buildServiceUrl(endpoints.serviceName, endpoints.namespace, port.port || 80)
                }))
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                serviceName: params.serviceName,
                namespace: params.namespace
            };
        }
    },
};
// Check service health
export const checkServiceHealth = {
    name: 'check_service_health',
    description: 'Check the health status of a Kubernetes service',
    inputSchema: checkServiceHealthSchema,
    handler: async (params) => {
        try {
            const healthStatus = await kubernetesClient.checkServiceHealth(params.serviceName, params.namespace);
            return {
                success: true,
                ...healthStatus
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                serviceName: params.serviceName,
                namespace: params.namespace
            };
        }
    },
};
// List namespaces
export const listNamespaces = {
    name: 'list_namespaces',
    description: 'List all available Kubernetes namespaces',
    inputSchema: listNamespacesSchema,
    handler: async () => {
        try {
            const namespaces = await kubernetesClient.getAllNamespaces();
            return {
                success: true,
                namespaceCount: namespaces.length,
                namespaces: namespaces.map((ns) => ({
                    name: ns.name,
                    status: ns.status,
                    labels: Object.entries(ns.labels).map(([key, value]) => `${key}=${value}`)
                }))
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error)
            };
        }
    },
};
//# sourceMappingURL=kubernetes.js.map