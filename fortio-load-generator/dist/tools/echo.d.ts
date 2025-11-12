import { z } from 'zod';
declare const echoSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
declare const echo: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
    handler: (params: z.infer<typeof echoSchema>) => Promise<{
        message: string;
        timestamp: string;
    }>;
};
export { echo };
//# sourceMappingURL=echo.d.ts.map