import passport from "passport";
import { UserORM } from "../../../api/user/user.entity";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { toPlainObject } from "lodash";

passport.use("jwt", new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    async (token, done) => {
        try{
            const user = await UserORM.findOneBy({id: token.id});
            if(user){
                const data = toPlainObject(user);
                return done(null, data);
            }else{
                return done(null, false, {message: 'invalid token'});
            }
        }catch(err){
            done(err);
        }
    }
))