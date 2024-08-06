import { useRouter } from 'next/router'
import { useState } from 'react'

// Possibilité de spécifier le champ exact de l'erreur ou si on a pas de compte
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

    return (
        <>
            <div className='w-screen h-screen bg-blue-600 font-sans flex justify-center items-center'>
                <div className='w-1/3 h-2/3 bg-white text-black rounded-lg flex flex-col items-center justify-center gap-12 p-4'>
                    <h2 className='font-bold text-2xl'>Connectez-vous</h2>
                    <input type='mail' placeholder='Votre mail' value={mailInput} onChange={(e) => setMailInput(e.target.value)} className='w-2/3 h-7 border-2 border-gray-200 rounded-xl' />
                    <input type='password' placeholder='Votre mot de passe' value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className='w-2/3 h-7 border-2 border-gray-200 rounded-xl' />
                    <button onClick={() => tenterConnexion()} className='bg-blue-600 rounded-lg w-1/3 h-fit text-white font-bold p-2'>Connexion</button>
                </div>
            </div>
        </>
    )
}