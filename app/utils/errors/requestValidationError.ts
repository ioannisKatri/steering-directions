import {CustomError} from "./customError";
import {ValidationError} from "express-validator";

export default class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super("Invalid Request Parameters");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        let errors = this.errors.map(err => {
            return {message: err.msg, field: err.param}
        });

        return {success: false, payload: {errors: errors}}
    };

}