import { randomUUID } from "crypto";
import { User } from "../models/user.model";

export class Tweet {
    public id: string;
    
    

    constructor(
        public content: string,
        public type: string,
        public userId: string,
    ){
        this.id = randomUUID();
    }
}