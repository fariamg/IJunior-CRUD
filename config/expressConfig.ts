import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express }  from  "express";
import UserRouter from "../src/domains/User/controllers/index";
import MusicRouter from "../src/domains/Music/controllers/index"
import ArtistRouter from "../src/domains/Artist/controllers/ArtistController"
import CountryRouter from "../src/domains/Country/controllers/CountryController"

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
app.use("/api/countries", CountryRouter);
// configurar rota de user.
