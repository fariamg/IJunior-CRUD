import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express }  from  "express";
import UserRouter from "../config/src/domains/User/controllers/index";
import MusicRouter from "../config/src/domains/Music/controllers/index"
import ArtistRouter from "../config/src/domains/Artist/controllers/index"
dotenv.config();



export const app: Express = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/users", UserRouter);
app.use("/api/music", MusicRouter);
app.use("/api/artists", ArtistRouter);
// configurar rota de user.
