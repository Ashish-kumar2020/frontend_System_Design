class Input {
  constructor(inputRenderingCost) {
    this.inputRenderingCost = inputRenderingCost;
  }
  accept(visitor) {
    return visitor.visitInput(this);
  }
}

class Button {
  constructor(buttonRenderingCost) {
    this.buttonRenderingCost = buttonRenderingCost;
  }
  accept(visitor) {
    return visitor.visitButton(this);
  }
}

class Image {
  constructor(imageRenderingCost) {
    this.imageRenderingCost = imageRenderingCost;
  }
  accept(visitor) {
    return visitor.visitImage(this);
  }
}

class Analysis {
  visitInput(Input) {
    return Input.inputRenderingCost;
  }
  visitButton(Button) {
    return Button.buttonRenderingCost;
  }
  visitImage(Image) {
    return Image.imageRenderingCost;
  }
}

class ExportVisitor {
  visitInput(Input) {
    return {
      type: "Input",
      renderingCost: Input.inputRenderingCost,
    };
  }
  visitButton(Button) {
    return {
      type: "Button",
      renderingCost: Button.buttonRenderingCost,
    };
  }
  visitImage(Image) {
    return {
        type: "Image",
        renderingCost:Image.imageRenderingCost
    }
  }
}

const button = new Button(10);
const input = new Input(20);
const image = new Image(30);

const visitor = new Analysis();
const visitorDetails = new ExportVisitor();
const totalCost =
  button.accept(visitor) + image.accept(visitor) + input.accept(visitor);

const details =[button.accept(visitorDetails) , image.accept(visitorDetails) , input.accept(visitorDetails)];
console.log(totalCost, details);
