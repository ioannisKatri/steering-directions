import {NextFunction, Request, Response} from "express";
import {Result, ValidationError, validationResult} from "express-validator";
import RequestValidationError from "../utils/errors/requestValidationError";

export const validateRequestErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError>  = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    next();
}