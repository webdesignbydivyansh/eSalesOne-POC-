import { Component } from '@angular/core';
import { landingService } from '../landingService';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  product:any =[];

  constructor(private landingService: landingService, private router: Router) { 
  }

  quantityMap: { [color: string]: { [size: string]: number } } = {};

  initializeQuantities() {
    for (let color of this.product.variants.color) {
      this.quantityMap[color] = {};
      for (let size of this.product.variants.size) {
        this.quantityMap[color][size] = 0;
      }
    }
  }

  getQty(color: string, size: string): number {
    return this.quantityMap[color]?.[size] || 0;
  }

  increaseQty(color: string, size: string) {
    this.quantityMap[color][size]++;
  }

  decreaseQty(color: string, size: string) {
    if (this.quantityMap[color][size] > 0) {
      this.quantityMap[color][size]--;
    }
  }

  ngOnInit() {
    console.log('Landing component initialized');
    
    this.landingService.getProduct().subscribe((products) => {
      // console.log('Product data:', products);
      this.product = products;
      this.initializeQuantities();
    });
  }
  buyNow() {
    const selectedItems: { color: string; size: string; quantity: number }[] = [];
    let totalPrice = 0;

    for (const color of this.product.variants.color) {
      for (const size of this.product.variants.size) {
        const qty = this.quantityMap[color][size];
        if (qty > 0) {
          selectedItems.push({ color, size, quantity: qty });
          totalPrice += qty * this.product.productPrice;
        }
      }
    }

    const checkoutData = {
      productTitle: this.product.productTitle,
      unitPrice: this.product.productPrice,
      items: selectedItems,
      totalPrice: totalPrice
    };

    console.log('Checkout Data:', checkoutData);

    this.router.navigate(['/checkout'], { state: {data: checkoutData } });
  }
}
