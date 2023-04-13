import { Injectable } from '@angular/core'
import { TokenService } from './token.service'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CalendlyService {
  constructor(private http: HttpClient) { }
}
