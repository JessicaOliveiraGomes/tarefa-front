import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITarefa } from '../model/Itarefa';


@Injectable({
  providedIn: 'root'
})

export class TarefaServiceService {

  urlApi: string= environment.urlApi;

  constructor(protected http: HttpClient) { }

buscar(): Observable<ITarefa[]> {
    const url = this.urlApi;
    return this.http.get<ITarefa[]>(url);
}

salvar(tarefa:ITarefa): Observable<ITarefa> {
  const url = this.urlApi;
  return this.http.post<ITarefa>(url,tarefa);
}

excluir(id:number): Observable<void> {
  return this.http.delete<void>(`${this.urlApi}/${id}`);
}

atualizar(tarefa:ITarefa): Observable<ITarefa> {
  const url = this.urlApi;
  return this.http.put<ITarefa>(url,tarefa);
}

/*
patch(endpoint: string, body: any, reqOpts?: any): Observable<ITarefa[]>  {
  return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
}
*/

}
