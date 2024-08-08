import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Produit({ element, panier, setPanier }) {

    const routeur = useRouter()

    const ajouterAuPanier = () => {
        setPanier([...panier, element])
    }

    return (
        <>
            <div className='w-3/8 lg:w-2/12 h-3/6 flex flex-col items-center gap-3 rounded-lg p-3 border-2 border-gray-400 border-solid text-black'>
                <Image src={element.path} width='80' height='80' className='w-4/5 h-2/6 rounded-lg' onClick={() => routeur.push(`/${element.nom}`)} alt='image produit' />
                <h3><strong>{element.nom}</strong></h3>
                <p>{element.prix}€</p>
                <button className='w-5/6 h-fit mt-5 transition-colors hover:bg-red-600 bg-red-300 text-white rounded-xl p-2' onClick={() => ajouterAuPanier()}>Ajouter au panier</button>
            </div>
        </>
    )
}