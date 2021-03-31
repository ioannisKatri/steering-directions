import {query} from "express-validator";

const directionValidator = [
    query('heading', 'Query parameter must be a number between 0 and 360.')
        .toInt().isInt({min:0, max: 360}),
    query('target', 'Query parameter must be a number between 0 and 360.')
        .toInt().isInt({min:0, max: 360})
]

export default directionValidator;