import { Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";
import statusCodes from "../../../../utils/constants/statusCodes";
import { checkRole, login, logout, verifyJWT } from "../../../middlewares/auth";
import { userRoles } from "../../../../utils/constants/userRoles";

const router = Router();

router.post("/login", login);
router.post("/logout", verifyJWT, checkRole([userRoles.ADMIN, userRoles.USER]), logout);
// router.post("/logout", verifyJWT, logout)


// ROTA PARA CRIAR UM USUÁRIO (POST)
router.post("/",  async function createUser(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserService.createUser(req.body); // Passando req.body diretamente

        res.status(statusCodes.CREATED).json(user);

    } catch (error) {
        next(error);
    }
});



// ROTA PARA ATUALIZAR SEU USUÁRIO (PUT) //
router.put("/update/:id", verifyJWT,  async function updateUser(req: Request, res: Response, next: NextFunction) {
    
    try {

        const loggedInUserId = req.user.id;
         // Passando tanto o id quanto o body para o método updateUser
        const user = await UserService.updateUser(Number(req.params.id), req.body, loggedInUserId);

        res.status(statusCodes.SUCCESS).json(user);
    } catch (error) {
        next(error);
    }
});

// ROTA PARA ATUALIZAR A SENHA DO USUÁRIO (PUT)
router.put("/account/password/", verifyJWT, async function updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
        
        const loggedInUserId = req.user.id; // ID do usuário logado
        
        // Atualizar a senha usando o UserService
        const updatedUser = await UserService.updatePassword(loggedInUserId, req.body.currentPassword, req.body.newPassword);

        // Resposta de sucesso
        res.status(statusCodes.SUCCESS).json({
            message: "Senha atualizada com sucesso!",
            user: updatedUser
        });

    } catch (error) {
        next(error);
    }
});



//ROTA PARA DELETAR SEU USUÁRIO
router.delete("/:id", verifyJWT, async function deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id;

        await UserService.deleteUser(Number(req.params.id), loggedInUserId);
        res.status(statusCodes.SUCCESS).json({
            message: `Usuário deletado com sucesso!`,
        }); 
    } catch (error) {
        next(error);
    }
});



//ROTA PARA VER SEU USUÁRIO
router.get("/", verifyJWT, async function getMyAccount(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id; 

       
        const user = await UserService.getUserbyId(loggedInUserId);

        res.status(statusCodes.SUCCESS).json(user); 
    } catch (error) {
        next(error);
    }
});

//ROTA DE OUVIR MUSICA
router.post("/account/listen/:id", verifyJWT, async function listenToMusic(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id; // ID do usuário logado
        const musicId = Number(req.params.id); // ID da música que está sendo ouvida

        await UserService.registerMusicListen(loggedInUserId, musicId);
        
        res.status(statusCodes.SUCCESS).json({
            message: `Música com ID "${musicId}" ouvida pelo usuário com ID ${loggedInUserId}.`,
        });

    } catch (error) {
        next(error);
    }
});

//ROTA DE REMOVER MUSICA OUVIDA
router.delete("/account/unlisten/:id", verifyJWT, async function unlistenToMusic(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id; // ID do usuário logado
        const musicId = Number(req.params.id); // ID da música que quer ser removida

        await UserService.removeMusicListen(loggedInUserId, musicId);
        
        res.status(statusCodes.SUCCESS).json({
            message: `Música com ID "${musicId}" removida pelo usuário com ID ${loggedInUserId}.`,
        });

    } catch (error) {
        next(error);
    }
});

//ROTA DE LISTAR MUSICAS OUVIDAS
router.get("/account/musics", verifyJWT, async function getUserMusics(req: Request, res: Response, next: NextFunction) {
    try {
        const loggedInUserId = req.user.id; 
        const musics = await UserService.getUserMusics(loggedInUserId);
        if(!musics){
            res.status(statusCodes.NOT_FOUND).json({
                message:`Usuário não ouviu músicas ainda!`
            })
        }
        res.status(statusCodes.SUCCESS).json(musics); 
    } 
    catch (error) {
        next(error);
    }
});



export default router;