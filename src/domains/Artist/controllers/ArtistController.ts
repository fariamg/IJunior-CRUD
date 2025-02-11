import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistService";
import { checkRole, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";
import statusCodes from "../../../../utils/constants/statusCodes";

const router = Router();



// ROTAS PARA LEITURA (GET) 
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artists = await ArtistService.getArtists();
        res.json(artists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM ARTISTA POR ID
router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        const artist = await ArtistService.getArtistbyId(id);

        res.status(statusCodes.SUCCESS).json(artist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM ARTISTA POR NOME
router.get("/name/:name", verifyJWT,  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.getArtistbyName(req.params.name);

        res.status(statusCodes.SUCCESS).json(artist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER ARTISTAS POR PAÍS

router.get("/country/:country", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = req.params.country;

        const artists = await ArtistService.getArtistsbyCountry(country);

        res.status(statusCodes.SUCCESS).json(artists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM ARTISTA 

router.post("/", verifyJWT, checkRole([userRoles.ADMIN]), async function createArtist(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, photo, bio, listeners } = req.body;

        const artist = await ArtistService.createArtist(req.body);

        res.status(statusCodes.CREATED).json(artist);;
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM ARTISTA  
router.put("/:id", verifyJWT, checkRole([userRoles.ADMIN]), async function updateArtist(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const artist = await ArtistService.updateArtist(Number(id), req.body);

        res.status(statusCodes.SUCCESS).json(artist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA DELETAR UM ARTISTA

router.delete("/:id", verifyJWT, checkRole([userRoles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        
        const artist = await ArtistService.getArtistbyId(Number(id));

        await ArtistService.deleteArtist(Number(id));

        res.status(statusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
});;

export default router;