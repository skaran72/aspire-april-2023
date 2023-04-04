
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import routes from "./routes/index"
dotenv.config();

/**
 * App Variables
 */

console.log(process.env.PORT)
if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 
 const app = express();

 
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/v1", routes)

/**
 * Server Activation
 */

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });