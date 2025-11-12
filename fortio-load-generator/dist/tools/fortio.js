import { z } from 'zod';
import { FortioRunner } from '../utils/fortio.js';
// Schema for basic load test
const runLoadTestSchema = z.object({
    url: z.string().url().describe('Target URL for the load test'),
    duration: z.string().optional().default('30s').describe('Test duration (e.g., "30s", "1m", "5m")'),
    connections: z.number().int().min(1).max(1000).optional().default(10).describe('Number of concurrent connections'),
    qps: z.number().optional().describe('Target queries per second (QPS). If not specified, will run at maximum rate'),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']).optional().default('GET').describe('HTTP method to use'),
    payload: z.string().optional().describe('Request payload for POST/PUT requests'),
    headers: z.record(z.string()).optional().describe('HTTP headers to include in requests'),
    timeout: z.string().optional().default('3s').describe('Request timeout (e.g., "3s", "5s")'),
});
// Schema for load profile generation
const createLoadProfileSchema = z.object({
    profileType: z.enum(['constant', 'ramp-up', 'spike', 'step']).describe('Type of load profile to generate'),
    url: z.string().url().describe('Target URL for the load test'),
    totalDuration: z.string().default('5m').describe('Total test duration (e.g., "5m", "10m")'),
    maxConnections: z.number().int().min(1).max(1000).default(100).describe('Maximum number of connections'),
    maxQps: z.number().optional().describe('Maximum QPS target'),
    steps: z.number().int().min(1).max(10).optional().default(5).describe('Number of steps for step/ramp profiles'),
});
// Schema for monitoring test results
const parseTestResultsSchema = z.object({
    rawResults: z.string().describe('Raw Fortio output to parse'),
    compareWith: z.array(z.string()).optional().describe('Previous test results to compare with'),
});
const fortioRunner = new FortioRunner();
// Run basic load test
export const runLoadTest = {
    name: 'run_load_test',
    description: 'Execute a basic Fortio load test against a target URL',
    inputSchema: runLoadTestSchema,
    handler: async (params) => {
        try {
            // Check if Fortio is available
            const fortioAvailable = await fortioRunner.checkFortioAvailable();
            if (!fortioAvailable) {
                return {
                    success: false,
                    error: 'Fortio command not found. Please ensure Fortio is installed and available in PATH.',
                    installInstructions: 'Install Fortio from: https://github.com/fortio/fortio'
                };
            }
            const loadTestParams = {
                url: params.url,
                duration: params.duration,
                connections: params.connections,
                qps: params.qps,
                method: params.method,
                payload: params.payload,
                headers: params.headers,
                timeout: params.timeout,
            };
            const result = await fortioRunner.runLoadTest(loadTestParams);
            if (result.success) {
                return {
                    success: true,
                    testResults: {
                        url: result.summary.url,
                        testConfiguration: {
                            duration: params.duration,
                            connections: params.connections,
                            qps: params.qps || 'unlimited',
                            method: params.method,
                            timeout: params.timeout,
                        },
                        performance: {
                            totalRequests: result.summary.requestCount,
                            successfulRequests: result.summary.successCount,
                            failedRequests: result.summary.errorCount,
                            successRate: result.summary.requestCount > 0
                                ? ((result.summary.successCount / result.summary.requestCount) * 100).toFixed(2) + '%'
                                : '0%',
                            actualQPS: result.summary.qps.toFixed(2),
                            actualDuration: result.summary.duration,
                        },
                        latency: {
                            average: `${(result.summary.averageLatency / 1000).toFixed(2)}ms`,
                            p50: `${(result.summary.p50Latency / 1000).toFixed(2)}ms`,
                            p90: `${(result.summary.p90Latency / 1000).toFixed(2)}ms`,
                            p99: `${(result.summary.p99Latency / 1000).toFixed(2)}ms`,
                            max: `${(result.summary.maxLatency / 1000).toFixed(2)}ms`,
                        },
                    },
                    rawOutput: result.rawOutput.split('\n').slice(0, 20).join('\n') + '\\n[truncated...]',
                    timestamp: new Date().toISOString(),
                };
            }
            else {
                return {
                    success: false,
                    error: 'Load test failed',
                    details: result.errors?.join(', ') || 'Unknown error',
                    rawOutput: result.rawOutput,
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                url: params.url,
            };
        }
    },
};
// Create load profiles
export const createLoadProfile = {
    name: 'create_load_profile',
    description: 'Generate different types of load testing profiles (constant, ramp-up, spike, step)',
    inputSchema: createLoadProfileSchema,
    handler: async (params) => {
        try {
            const profile = generateLoadProfile(params);
            return {
                success: true,
                profileType: params.profileType,
                configuration: params,
                loadProfile: profile,
                description: getProfileDescription(params.profileType),
                estimatedDuration: calculateTotalDuration(profile),
                instructions: 'Execute each step sequentially using the run_load_test tool with the specified parameters.'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                profileType: params.profileType,
            };
        }
    },
};
// Parse and analyze test results
export const parseTestResults = {
    name: 'parse_test_results',
    description: 'Parse and analyze Fortio test results, optionally comparing with previous results',
    inputSchema: parseTestResultsSchema,
    handler: async (params) => {
        try {
            // This is a simplified parser for demonstration
            const lines = params.rawResults.split('\n');
            const metrics = {};
            // Parse key metrics from raw output
            for (const line of lines) {
                if (line.includes('qps')) {
                    const qpsMatch = line.match(/([\d.]+) qps/);
                    if (qpsMatch)
                        metrics.qps = parseFloat(qpsMatch[1]);
                }
                if (line.includes('avg')) {
                    const avgMatch = line.match(/avg ([\d.]+)/);
                    if (avgMatch)
                        metrics.averageLatency = parseFloat(avgMatch[1]);
                }
                if (line.includes('calls')) {
                    const callsMatch = line.match(/(\d+) calls/);
                    if (callsMatch)
                        metrics.totalCalls = parseInt(callsMatch[1]);
                }
            }
            let analysis = {
                parsedMetrics: metrics,
                summary: generateSummaryAnalysis(metrics),
                recommendations: generateRecommendations(metrics),
            };
            if (params.compareWith && params.compareWith.length > 0) {
                analysis.comparison = {
                    message: 'Comparison feature would analyze differences with previous results',
                    previousResults: params.compareWith.length
                };
            }
            return {
                success: true,
                analysis,
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
            };
        }
    },
};
// Helper functions
function generateLoadProfile(params) {
    const steps = [];
    const stepDuration = calculateStepDuration(params.totalDuration, params.steps);
    switch (params.profileType) {
        case 'constant':
            steps.push({
                step: 1,
                duration: params.totalDuration,
                connections: params.maxConnections,
                qps: params.maxQps,
                description: 'Constant load throughout the test'
            });
            break;
        case 'ramp-up':
            for (let i = 1; i <= params.steps; i++) {
                const connections = Math.ceil((params.maxConnections / params.steps) * i);
                const qps = params.maxQps ? Math.ceil((params.maxQps / params.steps) * i) : undefined;
                steps.push({
                    step: i,
                    duration: stepDuration,
                    connections,
                    qps,
                    description: `Ramp-up step ${i}/${params.steps}`
                });
            }
            break;
        case 'spike':
            // Normal load, spike, then back to normal
            const normalConnections = Math.floor(params.maxConnections * 0.3);
            steps.push({
                step: 1,
                duration: '1m',
                connections: normalConnections,
                qps: params.maxQps ? Math.floor(params.maxQps * 0.3) : undefined,
                description: 'Baseline load'
            });
            steps.push({
                step: 2,
                duration: '30s',
                connections: params.maxConnections,
                qps: params.maxQps,
                description: 'Spike load'
            });
            steps.push({
                step: 3,
                duration: '1m',
                connections: normalConnections,
                qps: params.maxQps ? Math.floor(params.maxQps * 0.3) : undefined,
                description: 'Return to baseline'
            });
            break;
        case 'step':
            for (let i = 1; i <= params.steps; i++) {
                const connections = Math.ceil((params.maxConnections / params.steps) * i);
                const qps = params.maxQps ? Math.ceil((params.maxQps / params.steps) * i) : undefined;
                steps.push({
                    step: i,
                    duration: stepDuration,
                    connections,
                    qps,
                    description: `Step ${i}/${params.steps} - ${connections} connections`
                });
            }
            break;
    }
    return steps;
}
function getProfileDescription(profileType) {
    switch (profileType) {
        case 'constant':
            return 'Maintains steady load throughout the entire test duration';
        case 'ramp-up':
            return 'Gradually increases load from zero to maximum over multiple steps';
        case 'spike':
            return 'Tests system behavior under sudden load spikes';
        case 'step':
            return 'Increases load in discrete steps to identify performance thresholds';
        default:
            return 'Custom load profile';
    }
}
function calculateStepDuration(totalDuration, steps) {
    // Simple duration calculation - in a real implementation, this would be more sophisticated
    const match = totalDuration.match(/(\d+)([smh])/);
    if (!match)
        return '1m';
    const value = parseInt(match[1]);
    const unit = match[2];
    const stepValue = Math.floor(value / steps);
    return `${stepValue}${unit}`;
}
function calculateTotalDuration(profile) {
    return `${profile.length} steps - varies by profile type`;
}
function generateSummaryAnalysis(metrics) {
    if (!metrics.qps)
        return 'Unable to analyze - insufficient metrics';
    const qps = metrics.qps;
    const avgLatency = metrics.averageLatency || 0;
    if (qps > 1000 && avgLatency < 100) {
        return 'Excellent performance - high throughput with low latency';
    }
    else if (qps > 500 && avgLatency < 500) {
        return 'Good performance - acceptable throughput and latency';
    }
    else if (avgLatency > 1000) {
        return 'Performance concerns - high latency detected';
    }
    else {
        return 'Performance within normal ranges';
    }
}
function generateRecommendations(metrics) {
    const recommendations = [];
    if (metrics.averageLatency > 1000) {
        recommendations.push('Consider optimizing backend services to reduce response time');
        recommendations.push('Check for resource constraints (CPU, memory, network)');
    }
    if (metrics.qps < 100) {
        recommendations.push('Low throughput detected - consider scaling up resources');
        recommendations.push('Review connection pooling and keep-alive settings');
    }
    if (recommendations.length === 0) {
        recommendations.push('Performance looks healthy - consider stress testing with higher loads');
    }
    return recommendations;
}
//# sourceMappingURL=fortio.js.map