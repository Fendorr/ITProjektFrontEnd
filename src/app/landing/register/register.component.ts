import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublicService } from 'src/api/generated/controllers/Public';
import { UserService } from 'src/api/generated/controllers/User';
import { UserDTO } from 'src/api/generated/defs/UserDTO';
import { LoginDTO } from 'src/api/generated/model';
import { Tag } from 'src/app/project/new-project/new-project.component';

export enum TypeUserDTOEnum {
  Student = "Student",
  Professor = "Professor",
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  user: UserDTO = {};
  loginDto: LoginDTO = {};
  public password: string
  tags: Tag[] = [
    { name: 'Beispielkeyword' }
  ];
  keys: any[]
  types = TypeUserDTOEnum
  form: FormGroup


  constructor(private publicService: PublicService, private router: Router, private snackBar: MatSnackBar) {
    this.keys = Object.keys(this.types);
  }

  ngOnInit(): void {
    
  }

  // ngOnInit(): void {
  //   this.form = new FormGroup({
  //     email: new FormControl(this.user.email, [
  //       Validators.required,
  //       Validators.email
  //     ]),
  //     passwordHtml: new FormControl(this.password, [
  //       Validators.required,
  //       Validators.minLength(5)
  //     ]),
  //     userType: new FormControl(this.user.type, [
  //       Validators.required
  //     ])
  //   })
  // }

  // get email() { return this.form.get('email'); }
  // get passwordHtml() { return this.form.get('password'); }
  // get userType() { return this.form.get('userType'); }

  openSnackBar(msg: string, clss: string): void {
    this.snackBar.open(msg, '', {
      panelClass: [clss]
    });
  }

  onSubmit(){
    
  }

  createUser(): void {
    console.log(this.user);
    this.user.tags = []
    this.user.tags = this.tags.map(a => a.name); //Tags von Object-Array in String-Array mappen. (der nicht wirklich ein String-Array ist sondern immer noch ein Tag[] Array)
    this.user.likedProjects = [];
    this.user.projectInvites = [];
    this.user.sentApplications = [];
    this.publicService.user({ userDto: this.user, pw: this.password }).subscribe(user => {
      this.openSnackBar("User erfolgreich erstellt", 'success');
      this.router.navigate(['/login']),
        console.log(user)
    },
      (error) => { this.openSnackBar("Fehler: User konnte nicht erstellt werden", 'warn') });
  }

}
