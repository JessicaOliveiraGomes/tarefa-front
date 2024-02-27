import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if( this.loginForm.valid ){
      localStorage.setItem('basicAuth', 'Basic ' + btoa(this.loginForm.value.user + ':' + this.loginForm.value.password))
      this.dialog.closeAll();
      window.location.reload()
    }
  }
}
