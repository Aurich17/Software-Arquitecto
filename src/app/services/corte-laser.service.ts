import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CorteLaserResponse } from '../components/corte-laser/response/corte-laser.response';
import { CorteLaserRequest, MantCorteLaserRequest } from '../components/corte-laser/request/corte-laser.request';

@Injectable({
  providedIn: 'root',
})
export class CorteLaserService {
  private apiUrl = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  listaCorteLaser(request:CorteLaserRequest): Observable<CorteLaserResponse[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<CorteLaserResponse[]>(`${this.apiUrl}/list_corte_laser`,request,{headers});
  }

  mantCorteLaser(request:MantCorteLaserRequest): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<any>(`${this.apiUrl}/mant_corte_laser`,request,{headers});
  }
}
