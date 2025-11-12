export declare const allTools: ({
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        message: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        message: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>>) => Promise<{
        message: string;
        timestamp: string;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
    }, {
        namespace?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
    }, {
        namespace?: string | undefined;
    }>>) => Promise<{
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>>) => Promise<{
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>>) => Promise<{
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>;
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        url: import("zod").ZodString;
        duration: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        connections: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        qps: import("zod").ZodOptional<import("zod").ZodNumber>;
        method: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>>;
        payload: import("zod").ZodOptional<import("zod").ZodString>;
        headers: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        timeout: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        duration: string;
        connections: number;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        timeout: string;
        qps?: number | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        duration?: string | undefined;
        connections?: number | undefined;
        qps?: number | undefined;
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        url: import("zod").ZodString;
        duration: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        connections: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        qps: import("zod").ZodOptional<import("zod").ZodNumber>;
        method: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>>;
        payload: import("zod").ZodOptional<import("zod").ZodString>;
        headers: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        timeout: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        duration: string;
        connections: number;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        timeout: string;
        qps?: number | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        duration?: string | undefined;
        connections?: number | undefined;
        qps?: number | undefined;
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: string | undefined;
    }>>) => Promise<{
        success: boolean;
        error: string;
        installInstructions: string;
        testResults?: undefined;
        rawOutput?: undefined;
        timestamp?: undefined;
        details?: undefined;
        url?: undefined;
    } | {
        success: boolean;
        testResults: {
            url: string;
            testConfiguration: {
                duration: string;
                connections: number;
                qps: string | number;
                method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
                timeout: string;
            };
            performance: {
                totalRequests: number;
                successfulRequests: number;
                failedRequests: number;
                successRate: string;
                actualQPS: string;
                actualDuration: string;
            };
            latency: {
                average: string;
                p50: string;
                p90: string;
                p99: string;
                max: string;
            };
        };
        rawOutput: string;
        timestamp: string;
        error?: undefined;
        installInstructions?: undefined;
        details?: undefined;
        url?: undefined;
    } | {
        success: boolean;
        error: string;
        details: string;
        rawOutput: string;
        installInstructions?: undefined;
        testResults?: undefined;
        timestamp?: undefined;
        url?: undefined;
    } | {
        success: boolean;
        error: string;
        url: string;
        installInstructions?: undefined;
        testResults?: undefined;
        rawOutput?: undefined;
        timestamp?: undefined;
        details?: undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        profileType: import("zod").ZodEnum<["constant", "ramp-up", "spike", "step"]>;
        url: import("zod").ZodString;
        totalDuration: import("zod").ZodDefault<import("zod").ZodString>;
        maxConnections: import("zod").ZodDefault<import("zod").ZodNumber>;
        maxQps: import("zod").ZodOptional<import("zod").ZodNumber>;
        steps: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration: string;
        maxConnections: number;
        steps: number;
        maxQps?: number | undefined;
    }, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration?: string | undefined;
        maxConnections?: number | undefined;
        maxQps?: number | undefined;
        steps?: number | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        profileType: import("zod").ZodEnum<["constant", "ramp-up", "spike", "step"]>;
        url: import("zod").ZodString;
        totalDuration: import("zod").ZodDefault<import("zod").ZodString>;
        maxConnections: import("zod").ZodDefault<import("zod").ZodNumber>;
        maxQps: import("zod").ZodOptional<import("zod").ZodNumber>;
        steps: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration: string;
        maxConnections: number;
        steps: number;
        maxQps?: number | undefined;
    }, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration?: string | undefined;
        maxConnections?: number | undefined;
        maxQps?: number | undefined;
        steps?: number | undefined;
    }>>) => Promise<{
        success: boolean;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        configuration: {
            url: string;
            profileType: "constant" | "ramp-up" | "spike" | "step";
            totalDuration: string;
            maxConnections: number;
            steps: number;
            maxQps?: number | undefined;
        };
        loadProfile: {
            step: number;
            duration: string;
            connections: number;
            qps: number | undefined;
            description: string;
        }[];
        description: string;
        estimatedDuration: string;
        instructions: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        configuration?: undefined;
        loadProfile?: undefined;
        description?: undefined;
        estimatedDuration?: undefined;
        instructions?: undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        rawResults: import("zod").ZodString;
        compareWith: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        rawResults: import("zod").ZodString;
        compareWith: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }>>) => Promise<{
        success: boolean;
        analysis: any;
        timestamp: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        analysis?: undefined;
        timestamp?: undefined;
    }>;
})[];
export declare function getTools(): ({
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        message: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        message: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>>) => Promise<{
        message: string;
        timestamp: string;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
    }, {
        namespace?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
    }, {
        namespace?: string | undefined;
    }>>) => Promise<{
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>>) => Promise<{
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        serviceName: import("zod").ZodString;
        namespace: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        namespace: string;
        serviceName: string;
    }, {
        serviceName: string;
        namespace?: string | undefined;
    }>>) => Promise<{
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{}, "strip", import("zod").ZodTypeAny, {}, {}>;
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
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        url: import("zod").ZodString;
        duration: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        connections: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        qps: import("zod").ZodOptional<import("zod").ZodNumber>;
        method: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>>;
        payload: import("zod").ZodOptional<import("zod").ZodString>;
        headers: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        timeout: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        duration: string;
        connections: number;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        timeout: string;
        qps?: number | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        duration?: string | undefined;
        connections?: number | undefined;
        qps?: number | undefined;
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: string | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        url: import("zod").ZodString;
        duration: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
        connections: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
        qps: import("zod").ZodOptional<import("zod").ZodNumber>;
        method: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>>;
        payload: import("zod").ZodOptional<import("zod").ZodString>;
        headers: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodString>>;
        timeout: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodString>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        duration: string;
        connections: number;
        method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
        timeout: string;
        qps?: number | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
    }, {
        url: string;
        duration?: string | undefined;
        connections?: number | undefined;
        qps?: number | undefined;
        method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;
        payload?: string | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: string | undefined;
    }>>) => Promise<{
        success: boolean;
        error: string;
        installInstructions: string;
        testResults?: undefined;
        rawOutput?: undefined;
        timestamp?: undefined;
        details?: undefined;
        url?: undefined;
    } | {
        success: boolean;
        testResults: {
            url: string;
            testConfiguration: {
                duration: string;
                connections: number;
                qps: string | number;
                method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
                timeout: string;
            };
            performance: {
                totalRequests: number;
                successfulRequests: number;
                failedRequests: number;
                successRate: string;
                actualQPS: string;
                actualDuration: string;
            };
            latency: {
                average: string;
                p50: string;
                p90: string;
                p99: string;
                max: string;
            };
        };
        rawOutput: string;
        timestamp: string;
        error?: undefined;
        installInstructions?: undefined;
        details?: undefined;
        url?: undefined;
    } | {
        success: boolean;
        error: string;
        details: string;
        rawOutput: string;
        installInstructions?: undefined;
        testResults?: undefined;
        timestamp?: undefined;
        url?: undefined;
    } | {
        success: boolean;
        error: string;
        url: string;
        installInstructions?: undefined;
        testResults?: undefined;
        rawOutput?: undefined;
        timestamp?: undefined;
        details?: undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        profileType: import("zod").ZodEnum<["constant", "ramp-up", "spike", "step"]>;
        url: import("zod").ZodString;
        totalDuration: import("zod").ZodDefault<import("zod").ZodString>;
        maxConnections: import("zod").ZodDefault<import("zod").ZodNumber>;
        maxQps: import("zod").ZodOptional<import("zod").ZodNumber>;
        steps: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration: string;
        maxConnections: number;
        steps: number;
        maxQps?: number | undefined;
    }, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration?: string | undefined;
        maxConnections?: number | undefined;
        maxQps?: number | undefined;
        steps?: number | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        profileType: import("zod").ZodEnum<["constant", "ramp-up", "spike", "step"]>;
        url: import("zod").ZodString;
        totalDuration: import("zod").ZodDefault<import("zod").ZodString>;
        maxConnections: import("zod").ZodDefault<import("zod").ZodNumber>;
        maxQps: import("zod").ZodOptional<import("zod").ZodNumber>;
        steps: import("zod").ZodDefault<import("zod").ZodOptional<import("zod").ZodNumber>>;
    }, "strip", import("zod").ZodTypeAny, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration: string;
        maxConnections: number;
        steps: number;
        maxQps?: number | undefined;
    }, {
        url: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        totalDuration?: string | undefined;
        maxConnections?: number | undefined;
        maxQps?: number | undefined;
        steps?: number | undefined;
    }>>) => Promise<{
        success: boolean;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        configuration: {
            url: string;
            profileType: "constant" | "ramp-up" | "spike" | "step";
            totalDuration: string;
            maxConnections: number;
            steps: number;
            maxQps?: number | undefined;
        };
        loadProfile: {
            step: number;
            duration: string;
            connections: number;
            qps: number | undefined;
            description: string;
        }[];
        description: string;
        estimatedDuration: string;
        instructions: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        profileType: "constant" | "ramp-up" | "spike" | "step";
        configuration?: undefined;
        loadProfile?: undefined;
        description?: undefined;
        estimatedDuration?: undefined;
        instructions?: undefined;
    }>;
} | {
    name: string;
    description: string;
    inputSchema: import("zod").ZodObject<{
        rawResults: import("zod").ZodString;
        compareWith: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }>;
    handler: (params: import("zod").TypeOf<import("zod").ZodObject<{
        rawResults: import("zod").ZodString;
        compareWith: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }>>) => Promise<{
        success: boolean;
        analysis: any;
        timestamp: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        analysis?: undefined;
        timestamp?: undefined;
    }>;
})[];
//# sourceMappingURL=tools.d.ts.map