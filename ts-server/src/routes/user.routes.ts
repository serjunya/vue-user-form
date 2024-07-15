import { Router } from "express";
import { getUser } from "../controllers/user.controller";

class UserRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.get("/", getUser);
    }
}

export default new UserRoutes().router;
