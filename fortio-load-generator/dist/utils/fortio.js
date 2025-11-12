import { spawn } from 'child_process';
export class FortioRunner {
    fortioCommand = 'fortio';
    async runLoadTest(params) {
        try {
            const args = this.buildFortioArgs(params);
            const result = await this.executeFortio(args);
            return this.parseFortioOutput(result, params.url);
        }
        catch (error) {
            return {
                success: false,
                summary: {
                    url: params.url,
                    duration: params.duration || 'unknown',
                    requestCount: 0,
                    successCount: 0,
                    errorCount: 0,
                    qps: 0,
                    averageLatency: 0,
                    p50Latency: 0,
                    p90Latency: 0,
                    p99Latency: 0,
                    maxLatency: 0,
                },
                rawOutput: '',
                errors: [error instanceof Error ? error.message : String(error)]
            };
        }
    }
    buildFortioArgs(params) {
        const args = ['load'];
        // JSON output for parsing
        args.push('-json', '-');
        // Duration
        if (params.duration) {
            args.push('-t', params.duration);
        }
        // Connections
        if (params.connections) {
            args.push('-c', params.connections.toString());
        }
        // QPS (queries per second)
        if (params.qps) {
            args.push('-qps', params.qps.toString());
        }
        // HTTP method
        if (params.method && params.method !== 'GET') {
            args.push('-X', params.method);
        }
        // Payload data
        if (params.payload) {
            args.push('-payload', params.payload);
        }
        // Headers
        if (params.headers) {
            for (const [key, value] of Object.entries(params.headers)) {
                args.push('-H', `${key}: ${value}`);
            }
        }
        // Timeout
        if (params.timeout) {
            args.push('-timeout', params.timeout);
        }
        // URL (last argument)
        args.push(params.url);
        return args;
    }
    async executeFortio(args) {
        return new Promise((resolve, reject) => {
            const child = spawn(this.fortioCommand, args, {
                stdio: ['pipe', 'pipe', 'pipe']
            });
            let stdout = '';
            let stderr = '';
            child.stdout?.on('data', (data) => {
                stdout += data.toString();
            });
            child.stderr?.on('data', (data) => {
                stderr += data.toString();
            });
            child.on('close', (code) => {
                if (code === 0) {
                    resolve({ stdout, stderr });
                }
                else {
                    reject(new Error(`Fortio process exited with code ${code}: ${stderr}`));
                }
            });
            child.on('error', (error) => {
                reject(new Error(`Failed to start fortio process: ${error.message}`));
            });
        });
    }
    parseFortioOutput(output, url) {
        try {
            // Parse JSON output
            const lines = output.stdout.split('\n');
            let jsonLine = '';
            for (const line of lines) {
                if (line.trim().startsWith('{')) {
                    jsonLine = line.trim();
                    break;
                }
            }
            if (!jsonLine) {
                throw new Error('No JSON output found in fortio results');
            }
            const jsonResult = JSON.parse(jsonLine);
            const stats = jsonResult.DurationHistogram || {};
            const requestStats = jsonResult.RequestStats || {};
            // Extract key metrics
            const summary = {
                url,
                duration: jsonResult.RunType === 'HTTP' ? jsonResult.ActualDuration || 'unknown' : 'unknown',
                requestCount: requestStats.Count || 0,
                successCount: (requestStats.Count || 0) - (jsonResult.ErrorsDurationHistogram?.Count || 0),
                errorCount: jsonResult.ErrorsDurationHistogram?.Count || 0,
                qps: jsonResult.ActualQPS || 0,
                averageLatency: stats.Avg || 0,
                p50Latency: stats.Percentiles?.[0]?.Value || 0,
                p90Latency: stats.Percentiles?.[2]?.Value || 0,
                p99Latency: stats.Percentiles?.[4]?.Value || 0,
                maxLatency: stats.Max || 0,
            };
            return {
                success: true,
                summary,
                rawOutput: output.stdout,
                jsonResult,
                errors: jsonResult.ErrorsDurationHistogram?.Count > 0 ? ['Some requests failed'] : undefined
            };
        }
        catch (error) {
            // Fallback: try to parse text output
            return this.parseTextOutput(output, url);
        }
    }
    parseTextOutput(output, url) {
        try {
            const text = output.stdout;
            // Basic regex patterns for text parsing
            const durationMatch = text.match(/Actual duration: ([\d.]+[a-z]+)/i);
            const requestsMatch = text.match(/(\d+) calls/i);
            const qpsMatch = text.match(/([\d.]+) qps/i);
            const avgLatencyMatch = text.match(/avg ([\d.]+)/i);
            const summary = {
                url,
                duration: durationMatch?.[1] || 'unknown',
                requestCount: parseInt(requestsMatch?.[1] || '0', 10),
                successCount: parseInt(requestsMatch?.[1] || '0', 10), // Assume all successful for now
                errorCount: 0,
                qps: parseFloat(qpsMatch?.[1] || '0'),
                averageLatency: parseFloat(avgLatencyMatch?.[1] || '0'),
                p50Latency: 0,
                p90Latency: 0,
                p99Latency: 0,
                maxLatency: 0,
            };
            return {
                success: true,
                summary,
                rawOutput: text,
                errors: output.stderr ? [output.stderr] : undefined
            };
        }
        catch (error) {
            throw new Error(`Failed to parse fortio output: ${error}`);
        }
    }
    async checkFortioAvailable() {
        try {
            const result = await this.executeFortio(['version']);
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
//# sourceMappingURL=fortio.js.map