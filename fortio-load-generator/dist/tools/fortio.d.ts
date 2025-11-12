import { z } from 'zod';
declare const runLoadTestSchema: z.ZodObject<{
    url: z.ZodString;
    duration: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    connections: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    qps: z.ZodOptional<z.ZodNumber>;
    method: z.ZodDefault<z.ZodOptional<z.ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>>;
    payload: z.ZodOptional<z.ZodString>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    timeout: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
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
declare const createLoadProfileSchema: z.ZodObject<{
    profileType: z.ZodEnum<["constant", "ramp-up", "spike", "step"]>;
    url: z.ZodString;
    totalDuration: z.ZodDefault<z.ZodString>;
    maxConnections: z.ZodDefault<z.ZodNumber>;
    maxQps: z.ZodOptional<z.ZodNumber>;
    steps: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
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
declare const parseTestResultsSchema: z.ZodObject<{
    rawResults: z.ZodString;
    compareWith: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    rawResults: string;
    compareWith?: string[] | undefined;
}, {
    rawResults: string;
    compareWith?: string[] | undefined;
}>;
export declare const runLoadTest: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        url: z.ZodString;
        duration: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        connections: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        qps: z.ZodOptional<z.ZodNumber>;
        method: z.ZodDefault<z.ZodOptional<z.ZodEnum<["GET", "POST", "PUT", "DELETE", "PATCH"]>>>;
        payload: z.ZodOptional<z.ZodString>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        timeout: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
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
    handler: (params: z.infer<typeof runLoadTestSchema>) => Promise<{
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
};
export declare const createLoadProfile: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        profileType: z.ZodEnum<["constant", "ramp-up", "spike", "step"]>;
        url: z.ZodString;
        totalDuration: z.ZodDefault<z.ZodString>;
        maxConnections: z.ZodDefault<z.ZodNumber>;
        maxQps: z.ZodOptional<z.ZodNumber>;
        steps: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
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
    handler: (params: z.infer<typeof createLoadProfileSchema>) => Promise<{
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
};
export declare const parseTestResults: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        rawResults: z.ZodString;
        compareWith: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }, {
        rawResults: string;
        compareWith?: string[] | undefined;
    }>;
    handler: (params: z.infer<typeof parseTestResultsSchema>) => Promise<{
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
};
export {};
//# sourceMappingURL=fortio.d.ts.map