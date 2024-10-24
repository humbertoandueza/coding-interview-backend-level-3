import { Server } from "@hapi/hapi";
import { ValidationError } from "joi";
import { handleValidationError } from './errorHandlerValidation.utils';

export const createRoute = (
    server: Server,
    method: string,
    path: string,
    handler: (request: any, h: any) => any,
    schema?: any
) => {
    const routeConfig: any = {
        method,
        path,
        handler,
    };

    if (schema) {
        routeConfig.options = {
            validate: {
                payload: schema,
                failAction: (request, h, error) => {
                    if (error instanceof ValidationError) {
                        return handleValidationError(error, h);
                    }
                    return h.response({ message: 'Unknown error occurred' }).code(500).takeover();
                }
            }
        };
    }

    server.route(routeConfig);
};