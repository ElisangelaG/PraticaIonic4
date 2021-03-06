import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import {User} from '../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  login(user: User) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user:User){
    return this.auth.createUserWithEmailAndPassword(user.email,user.password);
  }
}

