import { Chats, Image, PaperPlaneRight, Plus, SignOut } from "@phosphor-icons/react";
import {useContext, useEffect, useRef, useState,} from "react";
import { Sharer } from "../utils/useContext";
import { ax } from "../utils/api.axios";
//import socket, { Socket } from 'socket.io-client'

export function Conversation({user,me,back}:{
    user:string,me:string ,back:()=>void
}) {
    const context = useContext(Sharer)
    const [id,setId] = useState<number>(Math.floor(Math.random() * 2004))
    const [I,setI] = useState<boolean>(false)
    const [online,setOnline] = useState<boolean>(false)
    const [type,SetTyping] = useState<boolean | null>(null)
    const Files = useRef<HTMLInputElement>(null)
    const [message,setMessage] = useState<string>("")
    const [mlist,setMlist] = useState<{
        message:string,
        from:string,
        style:"me"|"other",
        url?:string,
        id:number
    }[]>([])
    
    //UseEffects List
    useEffect(()=>{
        const connectSocket =()=>{
            context?.emit("is_on",user)
            context?.on("is_on",(res:boolean)=>{
                setOnline(res)
            })
            context?.on("some_off",(data:{user:{id:string,user:string},on:boolean})=>{
                if(data.user.user == user){
                    setOnline(data.on)
                }
            })
            context?.on("message",(data:{
                to:string,
                from:string,
                message:string,
                filename?:string,
                id:number
            })=>{
                if(!data.filename){
                    setMlist((e)=>{ 
                   const prev = e.filter(el => el.id != data.id)
                   return [...prev,{
                        style:"other",
                        message:data.message,
                        from:data.from,
                        id:data.id
                    }]
                 })  
                }else{
                    setMlist((e)=>{
                        const prev = e.filter(el => el.id != data.id)
                        return[
                        ...prev,
                        {
                            style:"other",
                            message:data.message,
                            from:data.from,
                            url:data.filename,
                            id:data.id
                        }
                    ]
                })
                }

            })
        }
        connectSocket()
        return()=>{
            context?.off("is_on")
            context?.off("some_off")
            context?.off("message")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    //Functions
    const HandleOff=()=>{
        back()
    }
    const HandlePlusClick=()=>{
        Files.current?.click()
    }
    const HandleClick = async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(type && message.trim() != "" || I ){
             
            const sc_Message:{
                to:string,
                from:string,
                data:string,
                filename?:string,
                id:number
            } = {
                to : user,
                from:me,
                data:message,
                id
            }
            setId((e)=>{
                const id = new Date().getMilliseconds() +  new Date().getSeconds()
                return (22+e + id + 2* Math.floor(Math.random() * 2025))
            })
            if (Files.current?.files?.length == 0) {
                //console.log(sc_Message)
                context?.emit("messages",sc_Message)
                setMlist((e)=>([...e,{
                    style:"me",
                    message:sc_Message.data,
                    from:"You",
                    id:sc_Message.id
                }]))
                setMessage("")
                setI(false)
                SetTyping(false)
            }else{
                //sc_Message.filename=Files.current?.files![0].name
                try {
                    const {data,status} = await ax.post("",{
                        photo:Files.current?.files![0]
                    }) 
                    if(status == 201){
                        sc_Message.filename=data.url
                        context?.emit("messages",sc_Message)
                        setMlist((e)=>[
                            ...e,
                            {
                                style:"me",
                                message:sc_Message.data,
                                from:"You",
                                url:sc_Message.filename,
                                id:sc_Message.id
                            }
                        ])
                    }

                } catch (error) {
                    console.log(error)
                }finally{
                    setI(false)
                    SetTyping(false)
                    setMessage("")
                }
            }
        }
    }

    //Main
    return (
        <>
            <div className="h-[70px] border-1 flex flex-row px-[10px] items-center">
                <div className="h-full  grow flex flex-row gap-[17px] items-center px-[17px]">
                    <p className="font-bold text-2xl">
                        {user}
                    </p>
                    <span className="text-xs">
                        {online ? (
                            <span className="h-[15px] w-[15px] rounded-2xl bg-green-400 flex"/>
                        ) : (
                            <span className="text-[10px] text-red-500 font-mono">off | last time</span>
                        )} 
                    </span>
                </div>
                <span onClick={HandleOff} className="flex items-center flex-row gap-[6px] cursor-pointer border-1 bg-red-500 border-white p-2 rounded">
                    <SignOut size={22} color="white"/>   
                    <span className="text-[10px] text-white font-bold">Sair do chat</span>
                </span>
            </div>
            <div className="grow border-1 max-h-[80%] overflow-x-hidden overflow-scroll">
              <div className="flex flex-col justify-end gap-2 p-[10px] max-w-[600px]"> 
                    {
                        mlist.map((data,index)=>{ 
                            if(data.style == "me") {
                                if(data.url){
                                    return(
                                    <div key={index} className="max-h-[max-content]  p-2 border-1 rounded flex flex-col flex-wrap ">
                                        <span className="text-sm text-blue-600  hover:text-blue-400 cursor-pointer flex flex-row items-center justify-between">
                                            {data.from}
                                            <span className="text-[12px] text-black font-mono">
                                                {`hour ${new Date().getHours()} : ${new Date().getMinutes()}`}
                                            </span>
                                        </span>
                                        <img src={data.url} alt="pic" className="h-[220px] w-[90%] rounded md:w-[50%] md:h-[250px]  " />
                                        {data.message && <p className="text-[18px] wrap-break-word max-w-[450px]">
                                            {data.message}
                                        </p>}
                                    </div>
                                    )
                                }   
                                return(
                                    <div key={index} className="max-h-[max-content]  p-2 border-1 rounded flex flex-col flex-wrap ">
                                        <span className="text-sm text-blue-600 hover:text-blue-400 cursor-pointer flex flex-row items-center justify-between">
                                            {data.from}
                                            <span className="text-[12px] text-black font-mono">
                                                {`hour ${new Date().getHours()} : ${new Date().getMinutes()}`}
                                            </span>
                                        </span>
                                        <p className="text-[18px] grow break-after-all max-h-[max-content] w-[450px]  wrap-break-word">
                                            {data.message}
                                        </p>
                                    </div>)
                            }else{
                                if(data.url){
                                    return(
                                    <div key={index} className="max-h-[max-content]  p-2 border-1 rounded flex flex-col flex-wrap">
                                        <span className="text-sm text-purple-700 cursor-pointer hover:text-purple-400 flex flex-row items-center justify-between">
                                            {data.from}
                                            <span className="text-[12px] text-black font-mono">
                                                {`hour ${new Date().getHours()} : ${new Date().getMinutes()}`}
                                            </span>
                                        </span>
                                        <img src={data.url} alt="pic" className="h-[220px] w-[90%] rounded" />
                                        {data.message && <p className="text-[18px] break-after-all max-w-[450px] wrap-break-word">
                                            {data.message}
                                        </p>}
                                    </div>
                                    )
                                }
                                return (
                                    <div key={index} className="max-h-[max-content]  p-2 border-1 rounded flex flex-col flex-wrap">
                                        <span className="text-sm text-purple-700 cursor-pointer hover:text-purple-400 flex flex-row items-center justify-between">
                                            {data.from}
                                            <span className="text-[12px] text-black font-mono">
                                                {`hour ${new Date().getHours()} : ${new Date().getMinutes()}`}
                                            </span>
                                        </span>
                                        <p className="text-[18px] max-w-[450px] wrap-break-word">
                                            {data.message}
                                        </p>
                                    </div>
                                )
                        }
                        })
                    }
             </div>
            </div>
            
            <div className="h-[60px]">
                        <div className="flex flex-row items-center h-[100%] gap-[10px]">
                            <div className="h-full p-2 rounded bg-white">
                                <Plus size={39}  onClick={HandlePlusClick} className="font-bold text-[20px] cursor-pointer" />
                            </div>
                            <div className="h-[100%]  grow rounded bg-white px-[10px] items-center flex flex-row gap-2 ">
                                {I ?( 
                                    <span className="rounded flex flex-row w-[max-content] h-[30px] p-1 border items-center im">
                                        <Image/> Image
                                    </span>) : (<></>)
                                }
                                <input type="text" value={message} onChange={(e) =>{
                                    setMessage(e.target.value)
                                    SetTyping(true)
                                }} 
                                className="
                                    outline-none border-none h-[100%] w-[100%] text-[18px]
                                "
                                placeholder="digite sua message"
                                />
                                <input type="file" ref={Files} hidden onChange={()=>{
                                    setI(true)
                                    SetTyping(true)
                                    }}/>
                            </div>
                            <button className="h-[100%] w-[60px] rounded flex items-center justify-center bg-blue-700"
                            onClick={(e)=>HandleClick(e)} >
                                {type ? (
                                    <PaperPlaneRight size={32} />
                                ) : (
                                    <Chats size={32} />
                                ) }
                            </button>
                        </div>
            </div>
        </>
    );
}
 