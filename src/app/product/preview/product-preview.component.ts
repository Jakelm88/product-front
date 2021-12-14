import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../state/product.model';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent implements OnInit {
  @Input() product = Product();

  constructor() { }

  ngOnInit(): void {
  }

}
