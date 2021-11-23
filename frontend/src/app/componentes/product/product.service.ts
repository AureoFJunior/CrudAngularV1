import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //URL base da aplicação
  baseUrl: string = 'http://localhost:3001/products'

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) { }

  //Quando inserir o produto, mostra a mensagem de sucesso.
  showMessage(msg: string, action: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: action
    })
  }

  //Cadastra o produto
  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorhandler(e))
    );
  }

  //Pega o erro para mostrar na Snack Bar
  errorhandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro inesperado.', 'erro')
    return EMPTY;
  }

  //Lê os produtos
  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl)
  }

  //Procura um produto com base em um Id
  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.get<Product>(url)
  }

  //Atualiza o produto
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`
    return this.httpClient.put<Product>(url, product)
  }

  //Deleta o produto
  delete(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.httpClient.delete<Product>(url)
  }

}
