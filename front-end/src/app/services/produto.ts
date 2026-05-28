import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:5150/produtos'; 

  constructor(private http: HttpClient) { }

  listarProdutos(pagina: number = 1, tamanhoPagina: number = 20): Observable<Produto[]> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('tamanhoPagina', tamanhoPagina.toString());

    return this.http.get<Produto[]>(this.apiUrl, { params });
  }

  buscarPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizarProduto(id: string, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${`${this.apiUrl}/${id}`}`, produto);
  }

  atualizarEstoque(id: string, novaQuantidade: number): Observable<Produto> {
  return this.http.patch<Produto>(`${this.apiUrl}/${id}/estoque?novaQuantidade=${novaQuantidade}`, {});
  }

  deletarProduto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}