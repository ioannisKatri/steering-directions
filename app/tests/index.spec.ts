import {BasicDirection} from "../services/basicDirection";
import ValidDirections from "../utils/enums/ValidDirections";
import app from "../app";
import request from "supertest";
import expectDirectionNegativeResponse from "./helper";

describe("Testing directions functionality", () => {

    describe("Test direction API endpoint", () => {

        describe('Direction Positive scenarios ', () => {
            it('It returns status 200 and left if heading is 170 and target 360', async () => {
                const result = await request(app)
                    .get('/directions?heading=170&target=360')
                    .send({})
                expect(result.status).toEqual(200);
                expect(result.body.success).toEqual(true);
                expect(result.body.payload.direction).toEqual(ValidDirections.Left)
            })

            it('It returns status 200 and Right if heading is 170 and target 180', async () => {
                const result = await request(app)
                    .get('/directions?heading=170&target=180')
                    .send({})
                expect(result.status).toEqual(200);
                expect(result.body.success).toEqual(true);
                expect(result.body.payload.direction).toEqual(ValidDirections.Right)
            })


            it('It returns status 200 and Straight if heading is 170 and target 170', async () => {
                const result = await request(app)
                    .get('/directions?heading=170&target=170')
                    .send({})
                expect(result.status).toEqual(200);
                expect(result.body.success).toEqual(true);
                expect(result.body.payload.direction).toEqual(ValidDirections.Straight)
            })
        })

        describe('Direction negative scenarios ', () => {
            it('It returns status 400 and an array of errors length 2 if we do not provide heading and target', async () => {
                const result = await request(app)
                    .get('/directions')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 2)
            })

            it('It returns status 400 and an array of errors length 1 if we do not provide target', async () => {
                const result = await request(app)
                    .get('/directions?heading=310')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 1)
            })

            it('It returns status 400 and an array of errors length 1 if we do not provide heading', async () => {
                const result = await request(app)
                    .get('/directions?target=75')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 1)
            })

            it('It returns status 400 and an array of errors length 2 if we provide both with text instead of number', async () => {
                const result = await request(app)
                    .get('/directions?heading=asdsa&target=asdsada')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 2)
            })

            it('It returns status 400 and an array of errors length 1 if heading includes text', async () => {
                const result = await request(app)
                    .get('/directions?heading=asdas&target=75')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 1)
            })

            it('It returns status 400 and an array of errors length 1 if target contains text', async () => {
                const result = await request(app)
                    .get('/directions?heading=310&target=asdas')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 1)
            })

            it('It returns status 400 and an array of errors length 2 if both contain values above 360', async () => {
                const result = await request(app)
                    .get('/directions?heading=361&target=361')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 2)
            })

            it('It returns status 400 and an array of errors length 2 if both contain values below zero', async () => {
                const result = await request(app)
                    .get('/directions?heading=-1&target=-1')
                    .send({})

                expectDirectionNegativeResponse(result, 400, true, false, 2)
            })
        })
    })


    describe('Test Basic Direction service ', () => {

        describe('Direction is straight ', () => {
            it("Returns Straight if heading is 350 and target 350", () => {
                const direction = new BasicDirection({heading: 350, target: 350})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Straight);
            })

            it("Returns Straight if heading is 360 and target 0", () => {
                const direction = new BasicDirection({heading: 360, target: 0})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Straight);
            })

            it("Returns Straight if heading is 0 and target 360", () => {
                const direction = new BasicDirection({heading: 0, target: 360})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Straight);
            })
        });

        describe('Direction is Right ', () => {
            it("Returns RIGHT if heading is 310 and target 75 (with difference greater than 180)", () => {
                const direction = new BasicDirection({heading: 310, target: 75})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Right);
            })

            it("Returns RIGHT if heading is 10 and target 30 (with difference less than 180)", () => {
                const direction = new BasicDirection({heading: 10, target: 30})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Right);
            })

            it("Returns RIGHT if heading is 40 and target 190 (with difference less than 180)", () => {
                const direction = new BasicDirection({heading: 40, target: 190})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Right);
            })

            it("Returns RIGHT if heading is 359 and target 30 (with difference greater than 180)", () => {
                const direction = new BasicDirection({heading: 359, target: 30})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Right);
            })

            it("Returns RIGHT if heading is 190 and target 320 (with difference less than 180)", () => {
                const direction = new BasicDirection({heading: 190, target: 320})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Right);
            })
        })

        describe('Direction is Left', () => {
            it("Returns Left if heading is 340 and target 330", () => {
                const direction = new BasicDirection({heading: 340, target: 330})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })

            it("Returns Left if heading is 170 and target 0", () => {
                const direction = new BasicDirection({heading: 170, target: 0})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })

            it("Returns Left if heading is 170 and target 360", () => {
                const direction = new BasicDirection({heading: 170, target: 360})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })


            it("Returns Left if heading is 170 and target 359", () => {
                const direction = new BasicDirection({heading: 179, target: 359})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })

            it("Returns LEFT if heading is 120 and target 30", () => {
                const direction = new BasicDirection({heading: 120, target: 30})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })

            it("Returns Left if heading is 50 and target 350", () => {
                const direction = new BasicDirection({heading: 50, target: 350})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })

            it("Returns Left if heading is 180 and target 360", () => {
                const direction = new BasicDirection({heading: 180, target: 360})
                const result = direction.calculate()
                expect(result).toEqual(ValidDirections.Left);
            })
        });
    })
})