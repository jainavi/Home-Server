import { createContext, useContext, useEffect, useState } from "react";
import socketio from "socket.io-client";

const getSocket = () =>
  socketio(process.env.EXPO_PUBLIC_SERVER_BASE_URL || "", {
    withCredentials: true,
  });

const SocketContext = createContext<{
  socket: ReturnType<typeof socketio> | null;
  connectionState: "connecting" | "connected" | "disconnected" | "failed";
}>({
  socket: null,
  connectionState: "connecting",
});

const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(
    null
  );
  const [connectionState, setConnectionState] = useState<
    "connecting" | "connected" | "disconnected" | "failed"
  >("connecting");

  useEffect(() => {
    const newSocket = getSocket();

    newSocket.on("connect", () => {
      setConnectionState("connected");
    });

    newSocket.on("disconnect", () => {
      setConnectionState("disconnected");
    });

    newSocket.on("connect_error", () => {
      setConnectionState("failed");
    });

    setSocket(newSocket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connectionState }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
