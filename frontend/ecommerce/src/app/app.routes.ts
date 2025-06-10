import { Routes } from '@angular/router';
import { Landing } from './landing/landing';
import { Checkout } from './checkout/checkout';
import { Thankyou } from './thankyou/thankyou';

export const routes: Routes = [
 {path: '', component:Landing},
 {path: 'checkout', component:Checkout},
 {path: 'thankyou', component:Thankyou}
];
