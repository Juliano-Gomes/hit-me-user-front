import { At, Chat, Lock, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function SignUp() {
        return(
            <div className="w-full h-[100vh] flex flex-col items-center justify-center Home">
                <header className='flex flex-row items-center w-[380px] py-[10px] h-[70px]'>
                    <Chat size={35} />
                    <span className='font-bold Hit'>
                        hit me    
                    </span>
                </header>
                <div className="flex flex-col gap-4 my-4">
                    <div className="flex flex-row bg-white h-[60px] w-[380px] items-center rounded gap-2 px-[9px]">
                        <User size={24} className="hit" />
                        <input type="text" placeholder="Digite seu Nome" className="outline-none border-none grow hit"/>
                    </div>

                    <div className="flex flex-row bg-white h-[60px] w-[380px] items-center rounded gap-2 px-[9px]">
                        <At size={24} className="hit" />
                        <input type="text" placeholder="Digite seu email" className="outline-none border-none grow hit"/>
                    </div>
                    <div className="flex flex-row bg-white h-[60px] w-[380px] items-center rounded gap-2 px-[9px]">
                        <Lock size={24} className="hit" />
                        <input type="text" placeholder="Digite seu senha" className="outline-none border-none grow hit"/>
                    </div>
                    <p className="justify-end text-end p-2">
                        Ja tem uma conta ? <Link to='/Login' className="text-blue-600">Aqui</Link> 
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between w-[380px]">
                    <button className='h-[45px] w-[170px] rounded Btn1 text-white text-[18px] font-bold '>
                        <Link to='/sign'>
                            criar conta
                        </Link>
                    </button>
                </div>
            </div>
    );
}
