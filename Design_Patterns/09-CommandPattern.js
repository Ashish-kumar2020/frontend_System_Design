class Light {
  constructor() {
    this.light = false;
  }

  turnOn() {
    return (this.light = true);
  }

  turnOff() {
    return (this.light = false);
  }
}

class TurnOnCommand {
  constructor(light) {
    this.lightInstance = light;
  }

  execute() {
    return this.lightInstance.turnOn();
  }
}

class TurnOffCommand {
  constructor(light) {
    this.lightInstance = light;
  }

  execute() {
    return this.lightInstance.turnOff();
  }
}

class RemoteControl {
  constructor() {
    this.command = null;
  }

  setCommand(command) {
    return (this.command = command);
  }

  pressButton() {
    if (this.command == null) {
      throw new Error("No command is given");
    }
    this.command.execute();
  }
}

// Driver code
const light = new Light();
const remote = new RemoteControl();

// TODO: Create commands and execute them
const TurnOnCommands = new TurnOnCommand(light);
const TurnOffCommands = new TurnOffCommand(light);

remote.setCommand(TurnOnCommands);
remote.pressButton();

remote.setCommand(TurnOffCommands);
remote.pressButton();