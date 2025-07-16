import { DoorOpen, FireSimple } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center Home">
        <span className="flex items-center text-9xl text-red-700 my-4">
            4<FireSimple size={100} fill="red" color="red" className="text-red"/>4
        </span>
        <p className="text-2xl font-mono">
            the page that you're looking for is no longer available .<Link to='/' className="text-blue-700 flex gap-1 m-2 items-center justify-center"><DoorOpen size={24} /> home</Link>
        </p>
    </div>
  );
}
