// Existing third-party gateway — don't modify this class.
class ThirdPartyPaymentGateway {
  makePayment(amount) {
    console.log(`Payment of ₹${amount} processed`);
  }
}

class PaymentAdapter {
  constructor(gateway) {
    // TODO: Store the gateway
    this.gateway = gateway;
  }

  pay(amount) {
    // TODO: Call the appropriate gateway method
    return this.gateway.makePayment(amount)
  }
}

class Checkout {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  checkout(amount) {
    this.paymentProcessor.pay(amount);
  }
}

// Driver code
const gateway = new ThirdPartyPaymentGateway();
const adapter = new PaymentAdapter(gateway);
const checkout = new Checkout(adapter);

checkout.checkout(500);