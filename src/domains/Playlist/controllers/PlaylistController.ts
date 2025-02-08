import { Router, Request, Response, NextFunction } from "express";
import PlaylistService from "../services/PlaylistService";

const router = Router();

// ROTA PARA LISTAR TODAS AS PLAYLISTS
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlists = await PlaylistService.getPlaylists();
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UMA PLAYLIST POR ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = await PlaylistService.getPlaylistById(Number(req.params.id));
        res.json(playlist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER UMA PLAYLIST POR NOME
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = await PlaylistService.getPlaylistByName(req.params.name);
        res.json(playlist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER PLAYLISTS DE CADA CRIADOR POR ID
router.get("/creator/:creatorId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlists = await PlaylistService.getPlaylistsByCreatorId(Number(req.params.creatorId));
        res.json(playlists);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA OBTER MUSICAS DE UMA PLAYLIST POR ID
router.get("/:id/musics", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const musics = await PlaylistService.getMusicsFromPlaylist(Number(req.params.id));
        res.json(musics);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA CRIAR UMA NOVA PLAYLIST
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playlist = await PlaylistService.createPlaylist(req.body, req.body.creatorId, req.body.collaboratorIds);
        res.status(201).json(playlist);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ADICIONAR UMA MUSICA A UMA PLAYLIST
router.post("/:playlistId/musics/:musicId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.addMusicToPlaylist(Number(req.params.playlistId), Number(req.params.musicId));
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});

// ROTA PARA REMOVER UMA MUSICA DE UMA PLAYLIST
router.delete("/:playlistId/musics/:musicId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.removeMusicFromPlaylist(Number(req.params.playlistId), Number(req.params.musicId));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ADICIONAR UM COLABORADOR A UMA PLAYLIST
router.post("/:playlistId/collaborators/:collaboratorId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.addCollaboratorToPlaylist(Number(req.params.playlistId), Number(req.params.collaboratorId));
        res.status(201).send();
    } catch (error) {
        next(error);
    }
});

// ROTA PARA DELETAR UMA PLAYLIST
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await PlaylistService.deletePlaylist(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export default router;