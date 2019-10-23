
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
declare var Stripe;
@Component({
  selector: 'stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {
  constructor() { }
  @Input() amount: number;
  @Input() description: string;
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
    this.stripe = Stripe('pk_test_eSZ2nnLY1wLLGdXfDGloFbVS00HQrqVhc8');
    console.log(this.stripe)
    const elements = this.stripe.elements();

    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.cardNumberElement.nativeElement);

    this.cardNumber.addEventListener('change', ({ error }) => {
      this.cardNumberErrors = error && error.message;
    });

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.cardExpiryElement.nativeElement);

    this.cardExpiry.addEventListener('change', ({ error }) => {
      this.cardExpiryErrors = error && error.message;
    });

    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cardCvcElement.nativeElement);

    this.cardCvc.addEventListener('change', ({ error }) => {
      this.cardCvcErrors = error && error.message;
    });
  }
  // async handleForm(e) {
  //   e.preventDefault();

  //   const { source, error } = await this.stripe.createSource(this.card);

  //   if (error) {
  //     // Inform the customer that there was an error.
  //     const cardErrors = error.message;
  //   } else {
  //     // Send the token to your server.
  //     // this.loading = true;
  //     // const user = await this.auth.getUser();
  //     // const fun = this.functions.httpsCallable('stripeCreateCharge');
  //     // this.confirmation = await fun({ source: source.id, uid: user.uid, amount: this.amount }).toPromise();
  //     // this.loading = false;

  //   }
  // }
}

