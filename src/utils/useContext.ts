import { createContext } from "react";
import { Socket } from "socket.io-client";

export const Sharer = createContext<Socket | null>(null)