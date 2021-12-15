import { Component, OnInit } from '@angular/core';
import { ProductsService } from './product/state/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'interro-front';
  
  constructor(private productService : ProductsService) {}

  ngOnInit(): void {
      this.productService.get();
  }

}
