import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaServiceService } from './../../service/tarefa-service.service';
import { ITarefa } from 'src/app/model/Itarefa';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})

export class FormComponentComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    protected tarefaServiceService: TarefaServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const tarefa: ITarefa = {} as ITarefa;
    this.form = this.formBuilder.group({
      id: [tarefa.id],
      nomeTarefa: [tarefa.nomeTarefa, [Validators.required]],
      detalhes: [tarefa.detalhes, [Validators.required]],
      data: [tarefa.data, [Validators.required]],
      lista: [tarefa.lista, [Validators.required]],
      concluido: [tarefa.concluido],
      checked: [tarefa.checked],
    });
  }

  onCancel() {
    throw new Error('Method not implemented.');
  }

  onSubmit() {


    if(this.form.valid) {
      this.tarefaServiceService.salvar(
        {
          id: this.form.value.id,
          nomeTarefa: this.form.value.nomeTarefa,
          detalhes: this.form.value.detalhes,
          data: this.form.value.data,
          lista: this.form.value.lista,
          concluido: this.form.value.concluido,
          checked: this.form.value.checked,
        }
  
      ).subscribe(console.log);
      this.form.reset()
    } else{
      Object.keys(this.form.controls).forEach(field => { // {1}
        const control = this.form.get(field);            // {2}
        control?.markAsTouched({ onlySelf: true });       // {3}
      });
    }

    }


}
