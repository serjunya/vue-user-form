import axios from "axios";
import globalConfig from "../../../global-cfg.json";

export default axios.create({
    baseURL: `http://localhost:${globalConfig.BACKEND_PORT}`,
});
