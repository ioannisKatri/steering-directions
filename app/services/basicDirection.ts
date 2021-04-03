import Direction from "./interfaces/direction";
import DirectionRequest from "../utils/interfaces/directionRequest";
import ValidDirections from "../utils/enums/ValidDirections";

export class BasicDirection implements Direction<ValidDirections> {

    constructor(private directionRequest: DirectionRequest) {
    }

    calculate(): ValidDirections {
        if (this.isStraight()) return ValidDirections.Straight;
        if (this.isRight()) return ValidDirections.Right;

        return ValidDirections.Left;
    }

    private isStraight(): boolean {
        const heading = this.directionRequest.heading;
        const target = this.directionRequest.target;

        const areEqual = heading === target

        return areEqual ||
            target === 360 && heading === 0 ||
            heading === 360 && target === 0;
    }

    private isRight(): boolean {
        const heading = this.directionRequest.heading;
        const target = this.directionRequest.target === 360 ? 0 : this.directionRequest.target;

        const positiveDifferenceIsLessThan180Degrees = heading - target > 180;
        const headingIsSmallerThanTarget = heading < target;
        const negativeDifferenceIsLessThanMinus180Degrees = heading - target > -180;

        return positiveDifferenceIsLessThan180Degrees ||
            (headingIsSmallerThanTarget && negativeDifferenceIsLessThanMinus180Degrees);
    }
}