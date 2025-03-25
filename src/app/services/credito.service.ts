import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CreditoRequest } from '../components/credito/request/credito.request';
import { CreditoResponse } from '../components/credito/response/credito.response';
import { UsuarioRequest } from '../components/credito/request/usuario.request';
import { UsuarioResponse } from '../components/credito/response/usuario.response';
import { MantCreditoRequest } from '../components/credito/request/mantCredito.request';

@Injectable({
  providedIn: 'root',
})
export class CreditoService {
  private apiUrl = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');

  constructor(private router: Router,private http: HttpClient) {}

  listaCredito(request:CreditoRequest): Observable<CreditoResponse[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<CreditoResponse[]>(`${this.apiUrl}/list_credito`,request,{headers});
  }


  listaUsuarios(request:UsuarioRequest): Observable<UsuarioResponse[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<UsuarioResponse[]>(`${this.apiUrl}/list_usuarios`,request,{headers});
  }

  mantCredito(request:MantCreditoRequest): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<any>(`${this.apiUrl}/mant_credito`,request,{headers});
  }


}
