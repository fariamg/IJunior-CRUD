import { Router, Request, Response, NextFunction } from "express";
import ArtistService from "../services/ArtistService";

const router = Router();



// ROTAS PARA LEITURA (GET) 
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artists = await ArtistService.getArtists();
        res.json(artists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM ARTISTA POR ID
router.get("/id/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido!" });
        }

        const artist = await ArtistService.getArtistbyId(id);
        if (!artist) {
            return res.status(404).json({ message: "Artista não encontrado." });
        }

        res.json(artist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UM ARTISTA POR NOME
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artist = await ArtistService.getArtistbyName(req.params.name);
        if (!artist) {
            return res.status(404).json({ message: "Artista não encontrado." });
        }

        res.json(artist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER ARTISTAS POR PAÍS
router.get("/country/:country", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const country = req.params.country;
        if (!country) {
            return res.status(400).json({ message: "País é obrigatório!" });
        }
        const artists = await ArtistService.getArtistsbyCountry(country);

        res.json(artists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UM ARTISTA (POST)
router.post("/", async function createArtist(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, photo, bio, listeners } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nome é obrigatório!" });
        }

        const artist = await ArtistService.createArtist(req.body);

        res.status(201).json(artist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR UM ARTISTA (PUT) //
router.put("/:id", async function updateArtist(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const artist = await ArtistService.updateArtist(Number(id), req.body);

        res.status(200).json(artist);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        
        const artist = await ArtistService.getArtistbyId(Number(id));
        if (!artist) {
            return res.status(404).json({ message: "Artista não encontrado." });
        }

        await ArtistService.deleteArtist(Number(id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});;

export default router;