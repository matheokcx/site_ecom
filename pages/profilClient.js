import Head from 'next/head'
import Image from 'next/image'
import TopBar from '../components/TopBar'
import Panier from '../components/Panier'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function profilClient() {

    const [panierVisible, setPanierVisible] = useState(false)
    const routeur = useRouter()
    const liste = routeur.query.liste

    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center bg-white'>
                <TopBar panierVisible={panierVisible} setPanierVisible={setPanierVisible} />
                {panierVisible ? <Panier liste={liste} /> : null}
                <div className='w-2/3 h-2/3 overflow-y-auto rounded-xl bg-gray-200 flex flex-col p-3 justify-center items-center text-black font-sans mt-10'>
                </div>
            </div>
        </>
    )
}