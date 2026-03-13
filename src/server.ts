import "./config/dotenv.ts";
import app from "./app.js";
import { port } from "./config/env.js";


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});