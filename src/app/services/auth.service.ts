import { Injectable } from '@angular/core';
import { Router, CanActivate , ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

import * as firebase from 'firebase';
import 'firebase/auth';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router, private user: UserService) {

    }

    /*
    async canActivate(route) {
        if (await this.user.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    */

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    // User is signed in.
                    resolve(true);
                    console.log('User sudah login');
                } else {
                    // No user is signed in.
                    resolve(false);
                    this.router.navigate(['/login']);
                    console.log('User belum login');
                }
            });
        });
    }
}
