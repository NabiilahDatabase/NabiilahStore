import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface User {
    uid: string;
    username: string;
}

@Injectable()
export class UserService {
    private user: User;
    private users: AngularFirestoreCollection;
    private userDetails: Observable<any>;

    constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
        this.users = this.db.collection<User>('users');
    }

    setUser(u: User) {
        this.user = u;
        this.users.doc(`${u.uid}`).set(u, {merge: true});
    }

    getUser() {
        return this.users.doc<User>(`${this.user.uid}`).valueChanges();
    }

    async isAuthenticated() {
        if (this.user) { return true; }

        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if (user) {
            this.setUser({
                username: user.email.split('@')[0],
                uid: user.uid
            });
            return true;
        }
        return false;
    }

    getUsername(): string {
        return this.user.username;
    }

    reAuth(username: string, password: string) {
// tslint:disable-next-line: max-line-length
        return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username + '@nabiilah.com', password));
    }

    updatePassword(newpass: string) {
        return this.afAuth.auth.currentUser.updatePassword(newpass);
    }

    updateEmail(newemail: string) {
        return this.afAuth.auth.currentUser.updateEmail(newemail);
    }

    getUID(): string {
        return this.user.uid;
    }

    logOut() {
        return this.afAuth.auth.signOut();
    }
}
