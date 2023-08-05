import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserIdentityORM } from "./user-identity.entity";
import * as bcrypt from "bcrypt";
import { toPlainObject } from "lodash";

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    async (username, password, done) => {
        try{
            const identity = await UserIdentityORM.findOne({
                where: {
                    username: username
                },
                relations: {
                    user: true
                }
            })
            if(!identity){
                return done(null, false, {message: `username: ${username} not found`});
            }
            const match = await bcrypt.compare(password, identity.hashedPassword);
            const data = toPlainObject(identity.user);
            if(match){
                return done(null, data);
            }
            done(null, false, {message: `invalid password`});
        }catch(err){
            done(err);
        }
    }
));
