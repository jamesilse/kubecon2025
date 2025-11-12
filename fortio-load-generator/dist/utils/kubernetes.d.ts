export declare class KubernetesClient {
    private k8sApi;
    constructor();
    listServices(namespace?: string): Promise<any>;
    getServiceEndpoints(serviceName: string, namespace?: string): Promise<{
        serviceName: string;
        namespace: string;
        serviceType: any;
        clusterIP: any;
        servicePorts: any;
        endpoints: any;
        ready: boolean;
    }>;
    checkServiceHealth(serviceName: string, namespace?: string): Promise<{
        serviceName: string;
        namespace: string;
        healthy: boolean;
        endpointCount: any;
        message: string;
    }>;
    buildServiceUrl(serviceName: string, namespace: string, port: number, protocol?: string): string;
    getAllNamespaces(): Promise<any>;
}
//# sourceMappingURL=kubernetes.d.ts.map