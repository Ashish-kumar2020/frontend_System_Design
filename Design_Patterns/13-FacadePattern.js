class VideoLoader {
  load(video) {
    console.log(`Loading video: ${video}`);
  }
}

class AudioSystem {
  initialize() {
    console.log("Audio system initialized");
  }
}

class VideoDecoder {
  decode(video) {
    console.log(`Decoding video: ${video}`);
  }
}

class VideoPlayerFacade {
  constructor() {
    this.videoLoader = new VideoLoader();
    this.audioSystem = new AudioSystem();
    this.videoDecoder = new VideoDecoder();
  }

  playVideo(video) {
    this.videoLoader.load(video);
    this.audioSystem.initialize();
    this.videoDecoder.decode(video);

  }
}

// Driver code
const player = new VideoPlayerFacade();
player.playVideo("movie.mp4");