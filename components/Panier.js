import Image from 'next/image'
import { useState } from 'react'

export default function Panier({ liste, passerCommande, montantPanier, setMontantPanier }) {

    return (
        <>
            <div className='absolute w-3/4 lg:w-1/6 h-1/6 bg-white lg:bg-opacity-100  overflow-x-hidden overflow-y-auto rounded-lg bottom-5 lg:bottom-auto lg:top-32 right-10 lg:right-6 p-4 border-2 border-gray-400 border-solid flex flex-col pt-2 items-center gap-3 text-white font-sans'>
                {liste.map((produit, index) => (
                    <>
                        <span className='flex flex-row items-center w-full gap-4'>
                            < button onClick={() => {
                                liste.splice(index, 1)
                                setMontantPanier(montantPanier - produit.prix)
                            }} className='w-fit h-fit bg-red-400 text-white p-2 rounded-xl font-bold' > - </button>
                            <p key={index} className='text-black'>{produit.nom} - {produit.prix}</p>
                        </span >
                    </>)
                )
                }
                {liste.length > 0 ? (<span className='w-full flex flex-row gap-2 justify-center items-center'><p className='w-1/3 text-black text-wrap font-bold'>Total : {montantPanier.toPrecision(4)}€</p><button onClick={() => passerCommande()} className='w-2/3 h-fit p-2 bg-yellow-400 rounded-xl text-white transition-transform hover:scale-105'>Valider Panier</button></span>) : <p className='text-black'>Panier vide...</p>}
            </div >
        </>
    )
}