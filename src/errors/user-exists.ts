export class UserExistsError extends Error {
    constructor(){
        super();
        this.name = 'UserExistsError';
        this.message = 'Username already in use';
    }
}