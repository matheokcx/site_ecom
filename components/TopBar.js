import Image from 'next/image'
import { useRouter } from 'next/router'

export default function TopBar({ articleCherche, setArticleCherche, faireRecherche, panierVisible, setPanierVisible }) {

    const routeur = useRouter()

    return (
        <>
            <div className='w-full h-1/6 flex flex-row items-center justify-center gap-8 bg-blue-600 text-white'>
                <Image src='/logo.png' width='65' height='65' onClick={() => routeur.push('/')} alt="logo" />
                <input type="text" placeholder="Chercher un article" className='w-2/4 h-7 text-black border-0 rounded-lg p-2' value={articleCherche} onChange={(e) => setArticleCherche(e.target.value)} />
                <button className='w-1/12 h-fit p-2 bg-white text-black rounded-xl border-0 active:translate-x-2 transition-transform' onClick={() => faireRecherche()}> Chercher</button>
                <Image src='/panier.png' width='40' height='40' alt='panier' onClick={() => { panierVisible ? setPanierVisible(false) : setPanierVisible(true) }} />
                <Image src='/profilPicture.png' width='40' height='40' alt='pp' />
            </div>
        </>
    )
}