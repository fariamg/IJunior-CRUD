import { Router, Request, Response, NextFunction } from "express";
import PlaylistService from "../services/PlaylistService";
import { verifyJWT } from "../../../middlewares/auth";

const router = Router();

// ROTA PARA LISTAR TODAS AS PLAYLISTS
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlists = await PlaylistService.getPlaylists();
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UMA PLAYLIST POR ID
router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = await PlaylistService.getPlaylistById(Number(req.params.id));
        res.json(playlist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UMA PLAYLIST POR NOME
router.get("/name/:name", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = await PlaylistService.getPlaylistsByName(req.params.name);
        res.json(playlist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER PLAYLISTS DE CADA CRIADOR
router.get("/creator/:creatorId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlists = await PlaylistService.getPlaylistsByCreatorId(Number(req.params.creatorId));
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER MUSICAS DE UMA PLAYLIST POR ID
router.get("/:id/musics", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await PlaylistService.getMusicsFromPlaylist(Number(req.params.id));
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UMA NOVA PLAYLIST
router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = await PlaylistService.createPlaylist(req.body, req.body.creatorId, req.body.collaboratorIds);
        res.status(201).json(playlist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ADICIONAR UMA MUSICA A UMA PLAYLIST
router.post("/:playlistId/musics/:musicId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.addMusicToPlaylist(Number(req.params.playlistId), Number(req.params.musicId));
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});

// ROTA PARA REMOVER UMA MUSICA DE UMA PLAYLIST
router.delete("/:playlistId/musics/:musicId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.removeMusicFromPlaylist(Number(req.params.playlistId), Number(req.params.musicId), req.body.userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ADICIONAR UM COLABORADOR A UMA PLAYLIST
router.post("/:playlistId/collaborators/:collaboratorId", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.addCollaboratorToPlaylist(Number(req.params.playlistId), Number(req.params.collaboratorId));
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});

// ROTA PARA DELETAR UMA PLAYLIST
router.delete("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.deletePlaylist(Number(req.params.id), req.body.userId);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;