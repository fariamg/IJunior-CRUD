import UserService from "./src/domains/User/services/UserService";
import ArtistService from "./src/domains/Artist/services/ArtistService";
import MusicService from "./src/domains/Music/services/MusicService";
import prisma from "./config/prismaClient";
import { Role } from "@prisma/client";
import { Artist } from '@prisma/client';
import { app } from "./config/expressConfig";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT, () => {
    console.log("Servidor hosteado na porta " + process.env.PORT)
});