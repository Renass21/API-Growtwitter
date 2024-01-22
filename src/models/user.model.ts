import { randomUUID } from "crypto";

export class User {
    public idUser: string;
    
    constructor(
        public name:string,
        public username:string,
        public email:string,
        public password:string,
        ){
            this.idUser = randomUUID()
        };
}