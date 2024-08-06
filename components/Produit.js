import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Produit({ nomProduit, cheminPhotoProduit, prixProduit, panier, setPanier }) {

    const routeur = useRouter()

    const ajouterAuPanier = () => {
        setPanier([...panier, nomProduit])  // Ajouter l'élément au panier en utilisant setPanier
    }

    return (
        <>
            <div className='w-2/12 h-3/6 flex flex-col items-center gap-3 rounded-lg p-3 border-2 border-gray-400 border-solid text-black'>
                <Image src={cheminPhotoProduit} width='80' height='80' className='w-4/5 h-2/6 rounded-lg' onClick={() => routeur.push(`/${nomProduit}`)} alt='image produit' />
                <h3><strong>{nomProduit}</strong></h3>
                <p>{prixProduit}€</p>
                <button className='w-5/6 h-fit bg-red-300 text-white rounded-xl p-2' onClick={() => ajouterAuPanier()}>Ajouter au panier</button>
            </div>
        </>
    )
}