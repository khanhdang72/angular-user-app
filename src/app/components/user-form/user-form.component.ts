import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl('')
  });

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.addUser(this.userForm.value);
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

  resetAll() {
    this.userForm.reset();
  }
}
