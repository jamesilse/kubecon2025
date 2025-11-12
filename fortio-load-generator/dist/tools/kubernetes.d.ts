import { z } from 'zod';
declare const listServicesSchema: z.ZodObject<{
    namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    namespace: string;
}, {
    namespace?: string | undefined;
}>;
declare const getServiceEndpointsSchema: z.ZodObject<{
    serviceName: z.ZodString;
    namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    namespace: string;
    serviceName: string;
}, {
    serviceName: string;
    namespace?: string | undefined;
}>;
declare const checkServiceHealthSchema: z.ZodObject<{
    serviceName: z.ZodString;
    namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    namespace: string;
    serviceName: string;
}, {
    serviceName: string;
    namespace?: string | undefined;
}>;
export declare const listServices: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        namespace: string;
    }, {
        namespace?: string | undefined;
    }>;
    handler: (params: z.infer<typeof listServicesSchema>) => Promise<{
        success: boolean;
        namespace: string;
        serviceCount: any;
        services: any;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        namespace: string;
        serviceCount?: undefined;
        services?: undefined;
    }>;
};
export declare const getServiceEndpoints: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        serviceName: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>;
    handler: (params: z.infer<typeof getServiceEndpointsSchema>) => Promise<{
        success: boolean;
        service: {
            name: string;
            namespace: string;
            type: any;
            clusterIP: any;
            ready: boolean;
        };
        endpoints: any;
        urls: any;
        error?: undefined;
        serviceName?: undefined;
        namespace?: undefined;
    } | {
        success: boolean;
        error: string;
        serviceName: string;
        namespace: string;
        service?: undefined;
        endpoints?: undefined;
        urls?: undefined;
    }>;
};
export declare const checkServiceHealth: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        serviceName: z.ZodString;
        namespace: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>;
    handler: (params: z.infer<typeof checkServiceHealthSchema>) => Promise<{
        serviceName: string;
        namespace: string;
        healthy: boolean;
        endpointCount: any;
        message: string;
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        serviceName: string;
        namespace: string;
    }>;
};
export declare const listNamespaces: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    handler: () => Promise<{
        success: boolean;
        namespaceCount: any;
        namespaces: any;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        namespaceCount?: undefined;
        namespaces?: undefined;
    }>;
};
export {};
//# sourceMappingURL=kubernetes.d.ts.map