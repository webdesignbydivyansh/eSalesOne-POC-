import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { thankyouService } from '../thankyouService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-thankyou',
  imports: [CommonModule],
  templateUrl: './thankyou.html',
  styleUrls: ['./thankyou.css']
})
export class Thankyou {
  // f7ecc016599b076bc55b10bbc4519bc7
  orderSummary: any;
  orderId!: string;
  constructor(private router:Router, private thankyouService: thankyouService) {
    
    const navigation = this.router.getCurrentNavigation();
    this.orderId = navigation?.extras?.state?.['data'];
    if (!this.orderId) 
      this.router.navigate(['/']);
    console.log('order_id',this.orderId);
    
    
  }
  
  ngOnInit() {
    this.thankyouService.getSummary(this.orderId).subscribe((summary) => {
      this.orderSummary = summary;
      console.log('order_summary',this.orderSummary);
    })
  }

  retryOrder() {
    this.router.navigate(['/checkout']);
  }
}
