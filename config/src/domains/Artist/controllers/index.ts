import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistService";
import statusCodes from "../../../../../utils/constants/statusCodes";

const router = Router();

// ROTAS PARA LEITURA (GET) //
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artists = await ArtistService.getArtists();
        res.status(statusCodes.SUCCESS).json(artists);

    } catch (error) {
        next(error);
    }
    
});

router.get("/id/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.getArtistbyId(Number(req.params.id));
        res.status(statusCodes.SUCCESS).json(artist);
        
    } catch (error) {
        next(error);
        
    }
});

router.get("/name/:name" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.getArtistbyName(req.params.name);
        res.status(statusCodes.SUCCESS).json(artist);
    } catch (error) {
        next(error)
    }
});





// ROTA PARA CRIAR UM USUÁRIO (POST)
router.post("/create", async function createArtist(req: Request, res: Response, next: NextFunction) {
    try {
        
        const artist = await ArtistService.createArtist(req.body);

        res.status(statusCodes.CREATED).json(artist);

    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM USUÁRIO (PUT) //
router.put("/update/:id", async function createArtist(req: Request, res: Response, next: NextFunction) {
    
    try {

        const artist = await ArtistService.updateArtist(req.body.id, req.body);
        res.status(statusCodes.SUCCESS).json(artist);

    } catch (error) {
        next(error);
    }
});

router.delete("/delete/:id", async function createartist(req: Request, res: Response, next: NextFunction) {
    
    try {
        
        await ArtistService.deleteArtist(req.body.id);
        res.status(statusCodes.SUCCESS).json({
            message: `Artista com ID ${req.body.id} deletado com sucesso!`,
        }); 

    } catch (error) {
        next(error);
    }
});


export default router;
