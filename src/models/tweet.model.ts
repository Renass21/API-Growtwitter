import { randomUUID } from "crypto";
import { User } from "../models/user.model";

export class Tweet {
    public id: string;
    public userId: string;
    

    constructor(
        public content: string,
        public type: string,
    ){
        this.id = randomUUID();
        this.userId = randomUUID();
    }
}