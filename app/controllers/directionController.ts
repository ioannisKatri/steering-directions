import {Request, Response} from "express"

import Direction from "../services/interfaces/direction";
import {BasicDirection} from "../services/basicDirection";
import DirectionRequest from "../utils/interfaces/directionRequest";
import ValidDirections from "../utils/enums/ValidDirections";

const getDirections = async (req: Request, res: Response) => {

    let heading: number = parseInt(<string>req.query.heading)
    let target: number =  parseInt(<string>req.query.target)

    const directions: DirectionRequest = {heading, target};
    const direction: Direction<ValidDirections> = new BasicDirection(directions);

    return res.status(200).json({success: true, payload: {direction: direction.calculate()}});
}

export default getDirections;