import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaServiceService } from './../../service/tarefa-service.service';
import { ITarefa } from 'src/app/model/Itarefa';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: ITarefa,
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

    if (this.data) {
      this.form.value.id = this.data.id;
      this.form.controls['nomeTarefa'].setValue(this.data.nomeTarefa);
      this.form.controls['detalhes'].setValue(this.data.detalhes);
      this.form.controls['data'].setValue(this.data.data);
      this.form.controls['lista'].setValue(this.data.lista);
      this.form.controls['concluido'].setValue(this.data.concluido);
      this.form.controls['checked'].setValue(this.data.checked);
      console.log(`atualizado`);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.tarefaServiceService
        .salvar({
          id: this.form.value.id,
          nomeTarefa: this.form.value.nomeTarefa,
          detalhes: this.form.value.detalhes,
          data: this.form.value.data,
          lista: this.form.value.lista,
          concluido: this.form.value.concluido,
          checked: this.form.value.checked,
        })
        .subscribe(
          (data) => {
            this.dialog.closeAll();
            this.form.reset();
          },
          (erro) => {
            alert(erro);
          }
        );
    } else {
      Object.keys(this.form.controls).forEach((field) => {
        // {1}
        const control = this.form.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
    }
  }

  deletar() {
    this.tarefaServiceService.excluir(this.form.value.id);
  }
}
