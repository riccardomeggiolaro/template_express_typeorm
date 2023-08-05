import { IsEmail, IsString, IsUrl, Matches, MinLength } from "class-validator";
import { Column, CreateDateColumn } from "typeorm";

export class SigninUserDTO {
    @IsString()
    firstName: string;
  
    @IsString()
    lastName: string;
  
    @IsUrl()
    picture: URL;
  
    @IsEmail()
    username: string;
  
    @MinLength(8)
    // @Matches(
    //   new RegExp('^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'),
    //   {
    //     message: 'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character'
    //   }
    // )
    password: string;
}

export class LoginUserDTO {
    @IsEmail()
    username: string;
  
    @IsString()
    password: string;
}