import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 3000;
import { app } from "./app";
import { AppDataSource } from "./app";
import "./utils/auth/auth.handlers";

AppDataSource.initialize()
    .then(() => {
        console.log("MySql connected");
        app.listen(PORT , () => {
            console.log(`App listening on port ${PORT}`);  
        })
    })
    .catch((error) => console.log(error))