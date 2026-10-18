class State{
    play() {}
    pause() {}
    stop() {}
}

class PlayingState extends State {
    constructor(player){
        super();
        this.player = player;
    }

    play(){
        console.log("Already Playing...");
    }
    pause(){
        console.log("Pausing the player.");
        this.player.setState(this.player.pausedState);
    }
    stop(){
        console.log("stoping the player");
        this.player.setState(this.player.stoppedState);
    }
}

class PausedState extends State{
    constructor(player){
        super();
        this.player = player;
    }

    play(){
        console.log("Resuming...");
        this.player.setState(this.player.playingState)
    }

    pause(){
        console.log("Already Paused");
    }
    stop(){
        console.log("Stoping the player.");
        this.player.setState(this.player.stoppedState);
    }
}

class StoppedState extends State{
    constructor(player){
        super();
        this.player = player;
    }

    play(){
        console.log("Starting play");
        this.player.setState(this.player.playingState);
    }
    pause(){
        console.log("Cannot pause. The player is stopped.");
    }

    stop(){
        console.log("Already stopped.");
    }
}

class Player {
    constructor(){
        this.playingState = new PlayingState(this);
        this.pausedState = new PausedState(this);
        this.stoppedState = new StoppedState(this);
        this.state = this.stoppedState;
    }

    setState(state){
        this.state = state;
    }
    play(){
        this.state.play();
    }
    pause(){
        this.state.pause();
    }
    stop(){
        this.state.stop();
    }
}
const player = new Player();

player.play(); // Starting play.
player.pause(); // Pausing the player.
player.play(); // Resuming play.
player.stop(); // Stopping the player.
player.stop(); // Already stopped.