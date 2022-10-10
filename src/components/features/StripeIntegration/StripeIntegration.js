import React, { Component } from 'react';
import './StripeIntegration.css'

class StripeTutorial extends Component {
  pay = (amount) => {
    var handler = window.StripeCheckout.configure({
      key: 'pk_test_51LqQzrBmzI5NiTvrWMD337HyXfci0EecxgTxGPiWJHzZilU53xiRz94kCVBHFl8zbbUUJ8LkIU5VH68hOYtFzloo00Cp9oceRG',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
  }
 
  componentDidMount() {
    this.loadStripe();    
  }
 
  loadStripe = () => {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";      
      window.document.body.appendChild(s);
    }
  }
 
  render() {
    return (
      <div className="mt-5">
        <h2>Stripe Checkout</h2>
        <div className="row mt-5">
          <div className="col-md-4 mt-2">
            <button onClick={() => this.pay(20)} className="btn btn-primary btn-block">Pay $20</button>
          </div>
          <div className="col-md-4 mt-2">
            <button onClick={() => this.pay(30)} className="btn btn-success btn-block">Pay $30</button>
          </div>
          <div className="col-md-4 mt-2">
            <button onClick={() => this.pay(50)} className="btn btn-info btn-block">Pay $50</button>
          </div>    
        </div>
        <p className="mt-5">
            Try it out using the test card number <b>4242 4242 4242 4242</b>, a random three-digit CVC number, any expiration date in the future, and a random five-digit U.S. ZIP code.
        </p>
      </div>
 
 
    );
  }
}
 
export default StripeTutorial;