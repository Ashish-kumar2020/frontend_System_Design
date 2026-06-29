import { useEffect, useRef } from "react";
import "./App.css";

function App() {

  // Stores the WebSocket instance.
  // We use useRef because we don't want re-renders when the socket changes.
  const socketRef = useRef(null);

  useEffect(() => {

    // Create a new WebSocket connection
    socketRef.current = new WebSocket("ws://localhost:8080");

    // Fires when the connection is successfully established
    socketRef.current.onopen = () => {
      console.log("✅ Connected to WebSocket Server");
    };

    // Cleanup function
    // Runs when the component unmounts.
    return () => {

      if (socketRef.current) {
        socketRef.current.close();
      }

    };

  }, []);

  return (
    <div>
      <h1>WebSocket Chat</h1>
    </div>
  );
}

export default App;