import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { Express }  from  "express";
import UserRouter from "../src/domains/User/controllers/UserController";
import MusicRouter from "../src/domains/Music/controllers/MusicController";
import ArtistRouter from "../src/domains/Artist/controllers/ArtistController";
import CountryRouter from "../src/domains/Country/controllers/CountryController";
import LikeRouter from "../src/domains/Like/controllers/LikeController";
import PaymentRouter from "../src/domains/Payment/controllers/PaymentController";
import PlaylistRouter from "../src/domains/Playlist/controllers/PlaylistController";
import SubscriptionRouter from "../src/domains/Subscription/controllers/SubscriptionController";
import AdminRouter from "../src/domains/Admin/controllers/AdminControllers";
import cookieParser = require("cookie-parser");

dotenv.config();

export const app: Express = express();

const options: CorsOptions = {
    credentials: true,
    origin: process.env.APP_URL
};

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/users", UserRouter);
app.use("/api/music", MusicRouter);
app.use("/api/artists", ArtistRouter);
app.use("/api/countries", CountryRouter);
app.use("/api/likes", LikeRouter);
app.use("/api/payments", PaymentRouter);
app.use("/api/playlists", PlaylistRouter);
app.use("/api/subscriptions", SubscriptionRouter);
app.use("/api/admin", AdminRouter);
// configurar rota de user.
