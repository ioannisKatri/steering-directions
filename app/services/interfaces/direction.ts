import DirectionRequest from "../../utils/interfaces/directionRequest";
import ValidDirections from "../../utils/enums/ValidDirections";

export default interface Direction<T> {
    calculate:() => T
}