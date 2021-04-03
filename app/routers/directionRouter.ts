import {Router} from "express";

import getDirections from "../controllers/directionController";
import directionValidator from "../utils/validators/directionValidator";
import {validateRequestErrors} from "../middlewares/validateRequestErrors";

export default function directionRouter(router: Router) {

    router.get("/directions",
        directionValidator,
        validateRequestErrors,
        getDirections
    )

    return router;
}