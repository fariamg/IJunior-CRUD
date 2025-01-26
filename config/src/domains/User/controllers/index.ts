import { Router, Request, Response, NextFunction} from "express";
import UserService from "../services/UserService";


const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getUsers();
        res.json(users);

    } catch (error) {
        next(error);
    }
    
});

router.get("/:id", async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserbyId(Number(req.params.id));
        res.json(user);
        
    } catch (error) {
        next(error);
        
    }
});

router.get("/:email" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.getUserbyEmail(req.params.email);
        res.json(user);
    } catch (error) {
        next(error)
    }
});

router.get("/country" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getUserByCountry(req.params.country);
        res.json(users);
        
    } catch (error) {
        next(error);
        
    }
});


export default router;