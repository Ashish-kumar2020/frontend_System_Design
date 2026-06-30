import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
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
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // Cleanup function
    // Runs when the component unmounts.
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    socketRef.current.send(message);
    setMessage("");
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => sendMessage()}>Send Message</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
