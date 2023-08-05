import Express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import Router from "./api/router";
import { DataSource } from "typeorm";
import { errorHandlers } from "./errors";
import { UserORM } from "./api/user/user.entity";
import { UserIdentityORM } from "./utils/auth/local/user-identity.entity";

export const app = Express();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "template",
    entities: [UserORM, UserIdentityORM],
    synchronize: false,
    logging: false,
})

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/api", Router);

app.use(errorHandlers);