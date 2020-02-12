import { Injectable } from '@angular/core';
import { User } from '../user';

import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static readonly UserStorageKey = 'userData';
  private users: User[] = [];

  // private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // private displayUsersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  // users$: Observable<User[]> = this.displayUsersSubject.asObservable();
  // length$: Observable<number> = this.lengthSubject.asObservable();


  constructor(
    private storageService: LocalStorageService
  ) {}

  addUser(user: User) {
    user.id = this.uuidv4();
    this.users.push(user);
    this.updateToLocalStorage();
  }

  getUser() {
    this.users = this.storageService.getValue(UserService.UserStorageKey);
    return this.users;
  }

  getUserId(id: string) {
    return this.users.find(user => user.id === id);
  }

  deleteUser(id: string) {
    this.users = this.users.filter(user => user.id !== id);
    this.updateToLocalStorage();
  }

  onDeleteSelected(users) {
    this.users = users;
    this.storageService.setObject(UserService.UserStorageKey, users);
  }

  updateToLocalStorage() {
    this.storageService.setObject(UserService.UserStorageKey, this.users);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
