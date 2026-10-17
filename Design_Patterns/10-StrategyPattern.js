class CreditCardPayment {
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card`)
    return (this.amount = amount);
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal`)
    return (this.amount = amount);
  }
}

class UPIPayment {
  pay(amount) {
    console.log(`Paid ${amount} using UPI`)
    return (this.amount = amount);
  }
}

class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    return this.strategy = strategy
  }

  checkout(amount) {
    if (this.strategy == null) {
      throw new Error("No Payment mode is selected");
    }
    return this.strategy.pay(amount);
  }
}

// Driver code
const processor = new PaymentProcessor(new CreditCardPayment());
processor.checkout(100);
processor.setStrategy(new PayPalPayment());
processor.checkout(200);
processor.setStrategy(new UPIPayment());
processor.checkout(300);
