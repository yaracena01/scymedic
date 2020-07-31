import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Cliente } from './interface/icliente';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://scymedic.azurewebsites.net/api/clientes";
  constructor(private http: HttpClient) { }

  getAllCliente(){
    const path = `${this.apiUrl}`;
    return this.http.get<Cliente[]>(path);
  }

  getClienteId(id: number){
    const path = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(path);
  }

  createCliente(cliente: Cliente){
    const path = `${this.apiUrl}`;
    return this.http.post<Cliente>(path, cliente);
  }

  updateCliente(cliente: Cliente) {
    const path = `${this.apiUrl}/${cliente.id}`;
    return this.http.put<Cliente>(path, cliente);
  }

  deleteCliente(id: number) {
    const path = `${this.apiUrl}/${id}`;
    return this.http.delete(path);
  }
}
