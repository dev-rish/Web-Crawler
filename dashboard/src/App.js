import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return <div>Hi {isConnected}</div>;
}

export default App;
