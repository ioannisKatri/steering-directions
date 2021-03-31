import request from "supertest";

export default function expectDirectionNegativeResponse(result: request.Response, status: number,
                                       hasErrorsArray: boolean, success: boolean,
                                       errorsLengthArray: number) {

    expect(result.status).toEqual(status);
    expect(Array.isArray(result.body.payload.errors)).toEqual(hasErrorsArray);
    expect(result.body.success).toEqual(success);
    expect(result.body.payload.errors.length).toEqual(errorsLengthArray)
}