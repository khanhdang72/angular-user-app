import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { CapitalizeFirstPipe } from 'src/app/pipes/capitalize.pipe';
import { User } from 'src/app/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [ CapitalizeFirstPipe ]
})
export class UserTableComponent implements OnInit {
  private users: User[];

  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'age', 'action'];
  dataSource;
  selection = new SelectionModel<User>(true, []);

  constructor(
    private userService: UserService,
    private capitalizeFirst: CapitalizeFirstPipe
  ) { }

  ngOnInit() {
    this.getUser();
    this.dataSource = new MatTableDataSource<User>(this.users);

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.firstName.toLowerCase().includes(filter)
      || data.lastName.toLowerCase().includes(filter)
      || data.age.toString().includes(filter);
    };

  }

  getUser() {
    this.users = this.userService.getUser();
  }

  deleteSelected() {
    this.selection.selected.forEach((selectUser: User) => {

    this.users = this.users.filter(user => user.id !== selectUser.id);
    console.log('users',this.users);

    this.dataSource.data = this.users;
    console.log('data', this.dataSource.data);
   });

   this.userService.onDeleteSelected(this.dataSource.data);
 }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
    this.dataSource.data = this.userService.getUser();

  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
