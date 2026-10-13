
class CircuitBreaker {
    constructor() {
        this.state = "CLOSED";
        this.failures = 0;
        this.failureThreshold = 3;
        this.resetTimer = 10_000;
        this.nextAttempt = 0;
        this.probeInProgress = false;
    }

    async execute(operation) {
        // Handle OPEN STATE
    
      this.handleOpenState();
      this.handleHalfOpenState();

      try {
        const result = await operation();
        this.failures = 0;
        this.state = "CLOSED";
        return result;
      } catch (error) {
        this.handleFailure();
        throw error;
      }finally{
        this.probeInProgress = false;
      }
    }

    handleOpenState() {
        if(this.state === "OPEN"){
            if(Date.now() < this.nextAttempt){
                throw new Error("Circuit is OPEN: Request is blocked");
            }
            this.state = "HALF_OPEN";
        }
    }

    handleFailure(){
        this.failures++;
        if(this.state === "HALF_OPEN" || this.failures >= this.failureThreshold){
            this.state = "OPEN";
            this.nextAttempt = Date.now() + this.resetTimer;
        }
    }

    handleHalfOpenState(){
       if(this.state === "HALF_OPEN"){
        if(this.probeInProgress){
            throw new Error("Probe is already in progress");
        }
        this.probeInProgress = true;
       }
    }


    

    getState(){
        return this.state;
    }
}

const circuit = new CircuitBreaker();

async function fetchNotes() {
  return circuit.execute(async () => {
    const response = await fetch("/api/notes");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  });
}

fetchNotes()
  .then((notes) => {
    console.log("Notes:", notes);
  })
  .catch((error) => {
    console.error("Request failed:", error.message);
  });