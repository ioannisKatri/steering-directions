import express, {Application, Request, Response, Router} from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import directionRouter from "./routers/directionRouter";
import {errorHandler} from "./middlewares/errorHandler";
import swaggerDocument from "./swagger.json";


const app: Application = express();
const router: Router = express.Router();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello :)")
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(directionRouter(router))

app.use(errorHandler)

export default app;