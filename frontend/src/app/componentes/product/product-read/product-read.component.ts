import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: String[] = ['id', 'name', 'price', 'action']
  
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== "") {
      this.deleteProduct(id!)
    }

    this.productService.read().subscribe(products => {
    this.products = products
    })
  }

  deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(product => {
      this.productService.showMessage(`Produto [${id}] excluído com sucesso.`, 'sucesso')
    });
    this.router.navigate(['/products'])
  }

}
