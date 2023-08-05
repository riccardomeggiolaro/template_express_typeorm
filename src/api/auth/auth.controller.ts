import { Response, NextFunction } from "express";
import { ParsedQs, TypedRequest } from "../../utils/typed-request.interface";
import { LoginUserDTO, SigninUserDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import UserService from "../user/user.services";
import { UserExistsError } from "../../errors/user-exists";
import passport from "passport";
import * as jwt from "jsonwebtoken";

export const signin = async (req: TypedRequest<SigninUserDTO, ParsedQs, LoginUserDTO>, res: Response, next: NextFunction) => {
    try{
        const userData = omit(req.body, 'username', 'password');
        const credentials = pick(req.body, 'username', 'password');
        const newUser = await UserService.add(userData, credentials);
        res.json(newUser);
    }catch(err){
        if(err instanceof UserExistsError){
            return res.status(400).send(err.message);
        }
        next(err);
    }
}

export const login = async (req: TypedRequest<LoginUserDTO>, res: Response, next: NextFunction) => {
    try{
        passport.authenticate("local", (err, user, info) => {
            if(err){
                return next(err);
            }
            if(!user){
                return res.status(401).json({error: 'LoginError', code: info.message});
            }
            const token = jwt.sign(user, process.env.JWT_SECRET!, {expiresIn: '7 days'})
            return res.status(200).json({user: user, token: token});
        })(req, res, next);
    }catch(err){
        next(err);
    }
}