import Image from 'next/image'
import { useState } from 'react'

export default function Panier({ liste, passerCommande }) {
    return (
        <>
            <div className='absolute w-1/6 h-1/6 overflow-x-hidden overflow-y-auto rounded-lg top-32 right-6 p-4 border-2 border-gray-400 border-solid flex flex-col pt-2 items-center gap-3 text-white font-sans'>
                {liste.map((nomProduit, index) => <p key={index} className='text-black'>{nomProduit}</p>)}
                {liste.length > 0 ? <button onClick={() => passerCommande()} className='w-2/3 h-fit p-2 bg-yellow-400 rounded-xl text-white transition-transform hover:scale-105'>Valider Panier</button> : <p className='text-black'>Panier vide...</p>}
            </div>
        </>
    )
}