import { Component, OnInit } from '@angular/core';
import { FormComponentComponent } from '../form-component/form-component.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Injectable } from '@angular/core';
import { TarefaServiceService } from 'src/app/service/tarefa-service.service';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {


  constructor(public dialog: MatDialog,
    public tarefaServiceService: TarefaServiceService,
    ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponentComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
  OpenLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout() {
    localStorage.clear();
    window.location.reload()
    }

    excluir(id: number) {
      this.tarefaServiceService.excluir(id).subscribe(
        (data) => {
          
        },
        (erro) => {
          alert('Erro ao excluir');
        }
      );
    }

}
