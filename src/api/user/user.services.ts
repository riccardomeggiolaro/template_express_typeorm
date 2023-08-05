import * as bcrypt from "bcrypt";
import { User } from "./user.interface";
import { UserIdentityORM } from "../../utils/auth/local/user-identity.entity";
import { UserExistsError } from "../../errors/user-exists";
import { UserORM } from "./user.entity";

export class UserService {
    async add(user: any, credentials: {username: string, password: string}): Promise<UserORM>{
        const existingIdentity = await UserIdentityORM.findOneBy({
            username: credentials.username
        })
        if(existingIdentity) {
            throw new UserExistsError();
        }
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newUser = new UserORM();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.picture = user.picture;
        const created = await newUser.save();
        const newUSerIdentity = new UserIdentityORM();
        newUSerIdentity.provider = "local";
        newUSerIdentity.user = created;
        newUSerIdentity.username = credentials.username;
        newUSerIdentity.hashedPassword = hashedPassword;
        await newUSerIdentity.save();
        return created;
    }
}

export default new UserService();