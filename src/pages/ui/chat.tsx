import { useEffect, useRef, useState, } from "react";
import { Conversation } from "../../components/Conversation";
import { Sharer } from "../../utils/useContext";
import socket, { Socket } from 'socket.io-client'
import { useNavigate } from "react-router-dom";
export function Chat() {
    const navegation = useNavigate()
    const [users,setUser] = useState<string >("")
    const sc_ref = useRef<Socket | null>(null)
    const [list,setList] = useState<string[] | null >(null)
    const [show,setShow] = useState<boolean>(false)
    const [name,setName] = useState<string>("")

    const HandleNameClicked =(name:string)=>{
        setName(name)
        setShow(true)
        //setList([...(list || []),"julien"])
    }
    const HandleOff=()=>{
        localStorage.removeItem("data")
        navegation("/")
    }
    //UseEffect

    useEffect(()=>{
        const pre_data= localStorage.getItem("data") as string
        const dt :{user:string;id:string}= JSON.parse(pre_data)
        if(!dt){
                navegation("/")
        }else{
            setUser(dt.user)
        }
        //setUser(`user_Julien_ ${new Date().getMilliseconds()} _ ${new Date().getSeconds()}`)
        const connectSocket =()=>{
            sc_ref.current = socket("http://localhost:4454/")
            if(users){
                sc_ref.current.emit("user",{
                    user:users,
                }) 
            }else{
                console.log("user null ",users)
            }

            sc_ref.current.on("List",(data:string[])=>{
                setList(()=>(
                    data.filter(e=> e != users)
                ))
            })
                
            sc_ref.current.on("disco",(disco:string[])=>{
                setList(()=>(
                    disco.filter(e=> e != users)
                ))
            })
        }
        
        connectSocket()
        return()=>{
            sc_ref.current?.disconnect()
        }
     
    },[navegation, users])
    //Main
    return (
        <Sharer.Provider value={sc_ref.current}>
            <div className="h-[100vh] flex flex-row p-[16px] Home">
                <div className="grow ">
                    <p className="my-2 flex flex-col items-start justify-center  gap-2">
                        <span className="font-bold text-[20px]">You : {users}</span>
                        <span onClick={HandleOff}  className="h-[max-content] text-white bg-red-500 cursor-pointer p-2 rounded font-mono mx-[3px] text-[13px]">
                            Log out
                        </span>
                    </p>
                    <h1>Amigos On :</h1>
                    <div className="flex flex-col gap-2 items-start">
                        {
                            list?.map((i,index)=>(
                                <div key={index} onClick={()=>HandleNameClicked(i)} className="h-[40px] w-[max-context] border text-center rounded py-[4px] px-1 hover:text-purple-600">
                                    {i}
                                </div>
                            ))
                        }
                    </div>
                </div>
                {show && <div className="w-[800px] flex flex-col gap-1">
                     <Conversation  user={name} me={users} back={()=>{setShow(false)}}/>
                </div>}
            </div>
        </Sharer.Provider>
    );
}
