import { At, Chat, Lock } from "@phosphor-icons/react"
import { Dots } from "react-activity";
//React Hooks
import { useEffect, useState } from "react"
import {  Log } from "../utils/api.axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export const Login=()=>{
    const navegation = useNavigate()
    const [email, setEmail] = useState<string>("");
    const [user, setUser] = useState<{name:string,message:string} | null>(null);
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean | null>(null);
    const [navegate, setNavegate] = useState<boolean | null>(false);
    const [success, setSuccess] = useState<boolean | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(()=>{
        const pre_data= localStorage.getItem("data") as string
        const data :{user:string;id:string}= JSON.parse(pre_data)
        if(data){
            navegation("/private")
        }
    },[navegation])
    const HandleSend =async()=>{
        if(email.includes("@") && email.includes(".com") && email.length > 4 && password.length > 8){
            setLoading(true);
            const {data,status} = await Log.post("/logIn", {email, password}) as {data:{user:string,message:string,e:string},status:number};

            if(status == 200){
                setUser({
                    name: data.user,
                    message: data.message
                })
                setLoading(false)
                setSuccess(true)
                //localhost or the magic
                localStorage.setItem("data",JSON.stringify({
                    user:data.user,
                    id:data.e
                }))
                setNavegate(true)
            }else{
                setError(true);
                alert("Email or password is wrong")
            }

        }else{
            setError(true);
            alert("Email or password is wrong")
        }
    }
    return(
        <div className="w-full h-[100vh] flex flex-col items-center justify-center Home">
            {!success && (<><header className='flex flex-row items-center w-[380px] py-[10px] h-[70px]'>
                <Chat size={35} />
                <span className='font-bold Hit'>
                    hit me    
                </span>
            </header>
            <div className="flex flex-col gap-4 my-4">
                <div className="flex flex-row bg-white h-[60px] w-[380px] items-center rounded gap-2 px-[9px]">
                    <At size={24} className="hit" color={error ? "red" : "rgb(218, 120, 42)"} />
                    <input type="text"
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder="Digite seu email" className="outline-none border-none grow hit"/>
                </div>
                <div className="flex flex-row bg-white h-[60px] w-[380px] items-center rounded gap-2 px-[9px]">
                    <Lock size={24} className="hit" color={error ? "red" : "rgb(218, 120, 42)"}/>
                    <input type="text"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    placeholder="Digite seu senha" className="outline-none border-none grow hit"/>
                </div>
                <p className="justify-end text-end p-2">
                    Esqueceu sua senha ? <Link to='/forget' className="text-blue-600">Aqui</Link> 
                </p>
            </div>
            <div className="flex flex-row items-center justify-between w-[380px]">
                <button className='h-[45px] w-[170px] rounded Btn text-white text-[18px] font-bold' onClick={HandleSend}>
                    { !loading &&
                    <Link to='/Login'>
                        entrar
                    </Link>}
                    { loading &&
                    <Dots/>
                    }
                </button>
                <button className='h-[45px] w-[170px] rounded Btn1 text-white text-[18px] font-bold '>
                    <Link to='/sign'>
                        criar conta
                    </Link>
                </button>
            </div></>)}
            {success && (
                <div className="flex flex-col text-xl font-bold text-green-600">
                    Preparing everything For your <br />
                    <span className="text-xs hit my-2">be welcome sr {user!.name}</span>
                    <Dots color="green" size={24}/>
                    {navegate && <Navigate to="/private" replace={true}/>}
                </div>
            )}
        </div>
    )
}