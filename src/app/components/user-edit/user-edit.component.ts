import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  userForm;
  firstName: string;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserId();
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      age: new FormControl(this.user.age)
    });
  }

  getUserId(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUserId(userId);

  }

  saveEdit() {
    this.user.firstName = this.userForm.get('firstName').value;
    this.user.lastName = this.userForm.get('lastName').value;
    this.user.age = this.userForm.get('age').value;
    this.userService.updateToLocalStorage();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  resetAll() {
    this.userForm.reset();
  }
}
