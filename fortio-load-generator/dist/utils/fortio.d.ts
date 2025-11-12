export interface FortioLoadTestParams {
    url: string;
    duration?: string;
    connections?: number;
    qps?: number;
    payload?: string;
    headers?: Record<string, string>;
    method?: string;
    timeout?: string;
    outputFile?: string;
}
export interface FortioResult {
    success: boolean;
    summary: {
        url: string;
        duration: string;
        requestCount: number;
        successCount: number;
        errorCount: number;
        qps: number;
        averageLatency: number;
        p50Latency: number;
        p90Latency: number;
        p99Latency: number;
        maxLatency: number;
    };
    rawOutput: string;
    jsonResult?: any;
    errors?: string[];
}
export declare class FortioRunner {
    private fortioCommand;
    runLoadTest(params: FortioLoadTestParams): Promise<FortioResult>;
    private buildFortioArgs;
    private executeFortio;
    private parseFortioOutput;
    private parseTextOutput;
    checkFortioAvailable(): Promise<boolean>;
}
//# sourceMappingURL=fortio.d.ts.map