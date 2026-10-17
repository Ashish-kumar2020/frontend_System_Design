class Coffee {
  cost() {
    return 100;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    // TODO: Return the coffee cost + ₹20
    return this.coffee.cost() + 20;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 10
  }
}

// Driver code
const coffee = new Coffee();
console.log(coffee.cost()); // 100

const coffeeWithMilk = new MilkDecorator(coffee);
console.log(coffeeWithMilk.cost()); // 120

const coffeeWithMilkAndSugar = new SugarDecorator(coffeeWithMilk);
console.log(coffeeWithMilkAndSugar.cost()); // 130