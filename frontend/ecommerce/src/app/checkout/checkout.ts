import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkoutService } from '../checkoutService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout {
  checkoutData: any
  form: FormGroup 

  constructor(private router:Router, private fb: FormBuilder,
    private checkoutService: checkoutService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.checkoutData = navigation?.extras?.state?.['data']; 

    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^\d{7}$/)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, this.futureDateValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });  
  }
  
  ngOnInit() {
    if (!this.checkoutData) 
      this.router.navigate(['/']);
  }
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const now = new Date();
    const input = new Date(control.value);
    return input > now ? null : { invalidDate: true };
  }

  simulateTransaction(): 'approved' | 'declined' | 'error' {
    const outcomes = ['approved', 'declined', 'error'];
    return outcomes[Math.floor(Math.random() * outcomes.length)] as any;
  }

  submit() {
    if (this.form.invalid) return;

    const result = this.simulateTransaction();
    const order = {
      ...this.form.value,
      product: this.checkoutData.productTitle,
      variant: this.checkoutData.items,
      subtotal: this.checkoutData.totalPrice,
      orderId: 'ORD' + Date.now(),
      status: result
    };

    const msg=this.checkoutService.postProductDetails(order).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
    console.log('msg',msg);
    this.router.navigate(['/thankyou'], { state: {data: order.orderId } });
    
  }
  
}
