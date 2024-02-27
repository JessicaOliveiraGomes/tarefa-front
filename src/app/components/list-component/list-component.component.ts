import { Component, Input, OnInit } from '@angular/core';
import { TarefaServiceService } from './../../service/tarefa-service.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITarefa } from 'src/app/model/Itarefa';
import { MatDialog } from '@angular/material/dialog';
import { FormComponentComponent } from '../form-component/form-component.component';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css'],
})
export class ListComponentComponent implements OnInit {
  @Input()
  public tarefa: any[] = [];

  public agrupamentoTarefas: any[] = [];

  constructor(
    public tarefaServiceService: TarefaServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inicializarTodos();
  }

  private inicializarTodos() {
    this.agrupamentoTarefas = [];
    this.tarefaServiceService.buscar().subscribe((data) => {
      data.forEach((taf) => {
        if (
          this.agrupamentoTarefas.filter((grup) => grup.lista == taf.lista)
            .length > 0
        ) {
          let index = this.agrupamentoTarefas.findIndex(
            (agr) => agr.lista == taf.lista
          );
          if (taf.concluido) {
            taf.checked = true;
            this.agrupamentoTarefas[index].done.push(taf);
          } else {
            this.agrupamentoTarefas[index].tasks.push(taf);
          }
        } else {
          if (taf.concluido) {
            taf.checked = true;
          }
          this.agrupamentoTarefas.push({
            lista: taf.lista,
            tasks: !taf.concluido ? [taf] : [],
            done: taf.concluido ? [taf] : [],
          });
        }
      });

      console.log(this.agrupamentoTarefas);

      this.tarefa = data;
    });
  }

  drop(event: CdkDragDrop<ITarefa[]>) {
    console.log(event);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      event.container.data[event.currentIndex].checked =
        !event.container.data[event.currentIndex].checked;
      event.container.data[event.currentIndex].concluido =
        !event.container.data[event.currentIndex].concluido;
      this.tarefaServiceService
        .salvar(event.container.data[event.currentIndex])
        .subscribe();
    }
  }

  movetarefaDone(agrumaneto: any, tarefa: ITarefa) {
    tarefa.checked = true;
    tarefa.concluido = true;
    agrumaneto.done.push(tarefa);
    this.tarefaServiceService.salvar(tarefa).subscribe();

    let index = agrumaneto.tasks.findIndex((t: ITarefa) => t.id == tarefa.id);
    if (index > -1) {
      agrumaneto.tasks.splice(index, 1);
    }
  }

  movetarefaTodo(agrumaneto: any, tarefa: ITarefa) {
    tarefa.checked = false;
    tarefa.concluido = false;
    agrumaneto.tasks.push(tarefa);
    this.tarefaServiceService.salvar(tarefa).subscribe();

    let index = agrumaneto.done.findIndex((t: ITarefa) => t.id == tarefa.id);
    if (index > -1) {
      agrumaneto.done.splice(index, 1);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormComponentComponent, { data: null });
    dialogRef.afterClosed().subscribe((result) => {
      this.inicializarTodos();
    });
  }

  openDialogWithData(tarefa: ITarefa) {
    const dialogRef = this.dialog.open(FormComponentComponent, {
      data: tarefa,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.inicializarTodos();
    });
  }

  excluir(id: number) {
    this.tarefaServiceService.excluir(id).subscribe(
      (data) => {
        this.inicializarTodos();
      },
      (erro) => {
        alert('Erro ao excluir');
      }
    );
  }
}
