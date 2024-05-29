import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environtment';
import { FestivoDTO } from '../../core/entidades/FestivoDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {


  url: string;
  constructor(private http: HttpClient) {

    this.url = `${environment.urlBase}festivos/`;
  }

  public listar(year: number): Observable<FestivoDTO[]> {
    return this.http.get<FestivoDTO[]>(`${this.url}listar/${year}`);
  }

  public verificarFecha(fecha: Date) {
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate(); 
    let urlT = `${this.url}verificar/${año}/${mes}/${dia}`; 
  
    return this.http.get(urlT, { responseType: 'text' });
  }
  
 
}
