import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
    uid: string;
    nama: string;
    email: string;
    hp: string;
}

@Injectable()
export class UserService {
    private user: User;
    private users: AngularFirestoreCollection;
    private router: Router;

    constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
        this.users = this.db.collection('users');
    }

    setUser(u: User) {
        this.user = u;
        this.users.doc(`${u.uid}`).set(u, {merge: true});
    }

    getUser(uid: string) {
        return this.users.doc<User>(`${uid}`).valueChanges();
    }

    /*
    async isAuthenticated() {
        if (this.user) { return true; }

        const user = await this.afAuth.authState.pipe(first()).toPromise();

        if (user) {
            this.setUser(this.user);
            return true;
        }
        return false;
    }
    */

    getUsername(): string {
        return this.user.nama;
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

    getUID() {
        return this.user.uid;
    }

    logOut() {
        this.afAuth.auth.signOut();
    }
}
