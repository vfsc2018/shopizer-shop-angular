
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
declare var Stripe;
@Component({
  selector: 'stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  constructor() { }
  // @Input() amount: number;
  // @Input() description: string;

  @Output() onNumberChange: EventEmitter<any> = new EventEmitter();
  @Output() onDateChange: EventEmitter<any> = new EventEmitter();
  @Output() onCVCChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('cardNumberElement') cardNumberElement: ElementRef;
  @ViewChild('cardExpiryElement') cardExpiryElement: ElementRef;
  @ViewChild('cardCvcElement') cardCvcElement: ElementRef;

  stripe; // : stripe.Stripe;
  cardNumber;
  cardExpiry;
  cardCvc;
  cardNumberErrors;
  cardExpiryErrors;
  cardCvcErrors;

  loading = false;
  confirmation;
  ngOnInit() {
    this.stripe = Stripe(environment.stripeKey);
    console.log(this.stripe)
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardNumber.addEventListener('change', ({ error }) => {

      if (error == undefined) {
        console.log(this.cardNumberElement.nativeElement);
        this.onNumberChange.emit(this.cardNumber);
      }
      this.cardNumberErrors = error && error.message;
    });

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardExpiry.addEventListener('change', ({ error }) => {
      if (error == undefined) {
        this.onDateChange.emit(this.cardExpiry);
      }
      this.cardExpiryErrors = error && error.message;
    });

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);

    this.cardCvc.addEventListener('change', ({ error }) => {
      if (error == undefined) {
        this.onCVCChange.emit(this.cardCvc);
      }
      this.cardCvcErrors = error && error.message;
    });
  }
  async submitOrder() {
    //   e.preventDefault();

    const { token, error } = await this.stripe.createToken(this.cardNumber);

    if (error) {
      // Inform the customer that there was an error.
      const cardErrors = error.message;
    } else {
      console.log(token)
      // Send the token to your server.
      // this.loading = true;
      // const user = await this.auth.getUser();
      // const fun = this.functions.httpsCallable('stripeCreateCharge');
      // this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
      // this.loading = false;

    }
  }
}

