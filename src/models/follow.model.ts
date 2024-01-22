import { randomUUID } from "crypto";

export class Follow {
    public id: string;
    
    constructor(
            public followed: string,
            public follower: string,
            public usernameFollowing: string,
            public usernameFollower: string,
            ) {
                this.id = randomUUID();        
            }
}