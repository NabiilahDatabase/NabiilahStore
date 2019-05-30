import { Injectable } from '@angular/core';

export interface User {
    uid: string;
    username: string;
}

@Injectable()
export class UserService {
    private user: User;
    setUser(user: User) {
        this.user = user;
    }
    getUID() {
        return this.user.uid;
    }
}
