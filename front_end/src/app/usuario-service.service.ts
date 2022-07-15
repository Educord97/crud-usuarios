import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUsuario } from './usuario/usuario';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  save(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.url, usuario);
  }

  list(): Observable<IUsuario[]> {
    return this.http.get<any>(this.url);
  }

  listById(id: number): Observable<IUsuario>{
    return this.http.get<IUsuario>(`${this.url}/${id}`);
  }

  update(id: number, usuario: IUsuario): Observable<Object>{
    return this.http.put(`${this.url}/${id}`, usuario);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
