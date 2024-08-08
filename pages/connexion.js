import { useRouter } from 'next/router'
import { useState } from 'react'
import Head from 'next/head'

export default function connexion() {

    const [mailInput, setMailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    const routeur = useRouter()

    const tenterConnexion = async () => {
        const requete = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail: mailInput,
                password: passwordInput
            })
        })

        if (requete.ok) {
            routeur.push(`/?mail=${mailInput}`)
        }
        else {
            const retour = await requete.json()
            alert(retour.message)
        }
    }

    const creerCompte = async () => {
        const requete = await fetch('/api/creerCompte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mail: mailInput,
                password: passwordInput
            })
        })

        if (requete.ok) {
            routeur.push(`/?mail=${mailInput}`)
        }
        else {
            const retour = await requete.json()
            alert(retour.message)
        }
    }

    return (
        <>
            <Head>
                <title>CyberNet - Connexion au compte</title>
                <link rel='icon' href='/logo.png' />
            </Head>
            <div className='w-screen h-screen bg-gradient-to-r from-blue-300 to-blue-800 font-sans text-black flex justify-center items-center'>
                <div className='w-3/4 lg:w-1/3 h-2/4 lg:h-2/3 bg-white bg-opacity-70 rounded-lg flex flex-col items-center justify-center gap-12 p-4'>
                    <h2 className='font-bold text-lg lg:text-2xl'>Connectez-vous</h2>
                    <input type='mail' placeholder='Votre mail' value={mailInput} onChange={(e) => setMailInput(e.target.value)} className='w-3/4 lg:w-2/3 h-7 border-2 border-gray-400 rounded-xl p-1' />
                    <input type='password' placeholder='Votre mot de passe' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className='w-3/4 lg:w-2/3 h-7 border-2 border-gray-400 rounded-xl p-1' />
                    <span className='w-full h-fit flex flex-col lg:flex-row gap-4 justify-center items-center'>
                        <button onClick={() => tenterConnexion()} className='bg-blue-600 rounded-lg w-2/3 lg:w-1/3 h-fit transition-transform hover:-translate-y-2 text-white font-bold p-2'>Connexion</button>
                        <button onClick={() => creerCompte()} className='bg-blue-600 rounded-lg w-2/3 lg:w-1/3 h-fit transition-transform hover:-translate-y-2 text-white font-bold p-2'>Créer un compte</button>
                    </span>
                </div>
            </div>
        </>
    )
}