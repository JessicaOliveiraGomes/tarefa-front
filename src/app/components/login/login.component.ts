import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TarefaServiceService } from 'src/app/service/tarefa-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(public dialog: MatDialog, 
  private formBuilder: FormBuilder,
   private tarefaServiceService: TarefaServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  cadastrar(){
      window.open("http://localhost:8081", "_blank");
  }

  onSubmit() {
    if( this.loginForm.valid ){
      this.tarefaServiceService.autenticar(this.loginForm.value.user,  this.loginForm.value.password).subscribe(
        (data) => {
          localStorage.setItem('basicAuth', 'Bearer ' +  data.access_token)
          localStorage.setItem('refreshToken', data.refresh_token)
          this.dialog.closeAll();
          window.location.reload()
        },
        (erro) => {
          alert('Usuaro e seenha icorretos');
        }
      );
      
      //window.open("http://localhost:8081", "_blank");
    }
    
  }
}
