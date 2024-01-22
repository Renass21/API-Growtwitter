import { randomUUID } from "crypto";
import { User } from "../models/user.model";

export class Tweet {
    public id: string;

    

    constructor(
        public userId: string,
        public content: string,
        public type: string,
    ){
        this.id = randomUUID();
    }
}