import { Chat } from '@phosphor-icons/react'
import Image_bg from '../assets/hitting.png'
import '../index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export const Home =()=>{
        const navegation = useNavigate()
        useEffect(()=>{
            const pre_data= localStorage.getItem("data") as string
            const data :{user:string;id:string}= JSON.parse(pre_data)
            if(data){
                navegation("/private")
            }
        },[navegation])
    return (
        <div className="w-full h-[100vh] text-black Home">
            <header className='flex flex-row items-center px-[120px] py-[10px] h-[70px]'>
                <Chat size={35} />
                <span className='font-bold Hit'>
                    hit me    
                </span>
            </header>
            <main className='flex items-center justify-around px-[20px]'>
                <div className='flex flex-col gap-[19px] w-[450px]  py-[20px] px-[15px]'>
                    <h1 className='font-bold text-[35px] hit'>
                        Hit me
                    </h1>
                    <div>
                        <p className='py-[10px]'>
                            Envie mensagens para qualquer um de maneira rapida,com possibilidade de troca de mensagem em grupo e envio de mensagens
                        </p>
                        <button className='h-[45px] w-[170px] rounded Btn text-white text-[18px] font-bold'>
                            <Link to='/Login'>
                                entrar
                            </Link>
                        </button>
                    </div>
                </div>
                <div>
                    <img src={Image_bg} alt="image png" />
                </div>
            </main>
        </div>
    )
}