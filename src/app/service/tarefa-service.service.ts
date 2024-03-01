import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

autenticar(user:string, password:string): Observable<any> {

  const body = new HttpParams()
  .set('username', user)
  .set('password', password)
  .set('client_id', 'todo')
  .set('grant_type', 'password');


  const url =  environment.autenticadorURL + '/protocol/openid-connect/token';
  return this.http.post<ITarefa>(url,body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
}


logout(): Observable<any> {
  let refres = localStorage.getItem('refreshToken')

  const body = new HttpParams()
  .set('client_id', 'todo')
  .set('refresh_token', refres ? refres : '')

  const url =  environment.autenticadorURL + '/protocol/openid-connect/logout';
  return this.http.post<ITarefa>(url,body.toString(),
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    });
}



/*
patch(endpoint: string, body: any, reqOpts?: any): Observable<ITarefa[]>  {
  return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
}
*/

}
