import { ResponseToolkit } from "@hapi/hapi";
import { ValidationError } from "joi";

export const handleValidationError = (error: ValidationError, h: ResponseToolkit) => {
    const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message
    }));
    return h.response({ errors }).code(400).takeover();
};
