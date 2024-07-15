import express, { Application } from "express";
import Server from "./src/server";
import globalCfg from "../global-cfg.json";

const app: Application = express();
new Server(app);
const PORT = globalCfg.BACKEND_PORT;

app.listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
}).on("error", (err) => {
    if ((err as any).code === "EADDRINUSE") {
        console.log("Error: address already in use");
    } else {
        console.log(err);
    }
});
