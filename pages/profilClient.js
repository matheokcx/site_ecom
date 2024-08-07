import Head from 'next/head'
import TopBar from '../components/TopBar'
import Panier from '../components/Panier'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function profilClient() {

    const routeur = useRouter()
    const liste = routeur.query.liste

    const [panierVisible, setPanierVisible] = useState(false)

    const [commandes, setCommandes] = useState([])

    const [clientMail, setClientMail] = useState(routeur.query.userMail)
    const [newMail, setNewMail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const modifierInfosClient = async () => {
        const requete = await fetch('/api/modifierInfosClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userMail: clientMail,
                nouveauMail: newMail,
                mdpActuel: currentPassword,
                nouveauMdp: newPassword
            })
        })

        if (requete.ok) {
            console.log("Tout c'est très bien passer !")
            const retour = await requete.json()
            if (retour.newMail != null) {
                setClientMail(retour.newMail)
                routeur.push(`/profilClient?clientMail=${retour.newMail}`)
            }
        }
        else {
            const retour = await requete.json()
            alert(retour.message)
        }
    }

    const afficherCommandes = async () => {
        const requete = await fetch(`/api/affichageCommande?mail=${clientMail}`)
        if (!requete.ok) {
            const retour = await requete.json()
            alert(retour.message)
        }
        else {
            const retour = await requete.json()
            setCommandes(retour)
        }
    }

    useEffect(() => {
        afficherCommandes()
    }, [commandes])

    return (
        <>
            <Head>
                <title>CyberNet - Profil client</title>
                <link rel='icon' href='/logo.png' />
            </Head>
            <div className='w-screen h-screen flex flex-col items-center bg-white'>
                <TopBar panier={liste} panierVisible={panierVisible} setPanierVisible={setPanierVisible} userMail={clientMail} />
                {panierVisible ? <Panier liste={liste} /> : null}
                <div className='w-2/3 h-2/3 overflow-y-auto rounded-xl bg-gray-200 flex flex-col gap-8 p-3 justify-center items-center text-black font-sans mt-10'>
                    <div className='w-full h-1/3 overflow-y-auto'>
                        <h2 className='font-bold text-black'><u>Commandes : </u></h2>
                        <ul>
                            {commandes.map((e, index) => <li key={index}>#{e.idCom} -- {e.mont}€</li>)}
                        </ul>
                    </div>
                    <label><u><strong>Modifier vos informations :</strong></u></label>
                    <span className='flex w-full h-fit justify-center gap-5'>
                        <input type='mail' placeholder='Votre nouveau mail' value={newMail} onChange={(e) => setNewMail(e.target.value)} className='w-1/2 h-7 bg-white text-black p-1' />
                        <button onClick={modifierInfosClient} className='w-fit h-fit p-1 rounded-lg text-black bg-white'>Modifier</button>
                    </span>
                    <span className='flex w-full h-fit justify-center gap-5'>
                        <input type='text' placeholder='Votre mot de passe actuel' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className='w-1/4 h-7 bg-white text-black p-1' />
                        <input type='text' placeholder='Votre nouveau mot de passe' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='w-1/4 h-7 bg-white text-black p-1' />
                        <button onClick={modifierInfosClient} className='w-fit h-fit p-1 rounded-lg text-black bg-white'>Modifier</button>
                    </span>
                    <button className='w-fit h-fit p-2 rounded-lg bg-red-400 text-white hover:scale-105 transition-transform' onClick={() => routeur.push('/connexion')}>Déconnexion</button>
                </div>
            </div>
        </>
    )
}