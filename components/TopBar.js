import Image from 'next/image'
import { useRouter } from 'next/router'

export default function TopBar({ articleCherche, setProduitCherche, faireRecherche, panierVisible, setPanierVisible, panier, userMail }) {

    const routeur = useRouter()

    return (
        <>
            <div className='w-full h-fit pb-4 lg:pb-0 lg:h-1/6 flex flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-8 bg-blue-600 text-white'>
                <Image src='/logo.png' width='130' height='130' className='hover:cursor-pointer' onClick={() => routeur.push(`/?mail=${userMail}`)} alt="logo" />
                <span className='w-full lg:w-2/3 flex gap-3 justify-center items-center'>
                    <input type="text" placeholder="Chercher un article" className='w-2/3 lg:w-2/4 h-7 text-black border-0 rounded-lg p-2' value={articleCherche} onChange={(e) => setProduitCherche(e.target.value)} />
                    <button className='w-1/4 lg:w-1/12 h-8 p-2 bg-white text-black rounded-xl border-0 active:translate-x-2 transition-transform' onClick={() => faireRecherche()}> Chercher</button>
                </span>
                <Image src='/panier.png' width='40' height='40' alt='panier' className='hover:cursor-pointer' onClick={() => { panierVisible ? setPanierVisible(false) : setPanierVisible(true) }} />
                {userMail == undefined ? <button onClick={() => routeur.push("/connexion")} className='bg-white text-black rounded-xl p-2 w-fit h-fit hover:bg-blue-300 hover:text-white hover:cursor-pointer hover:scale-105 transition-transform'>Connexion</button> : <Image src='/profilPicture.png' width='40' height='40' alt='pp' className='hover:cursor-pointer' onClick={() => routeur.push(`/profilClient?liste=${panier}&userMail=${userMail}`)} />}
            </div>
        </>
    )
}