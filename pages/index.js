import Head from 'next/head'
import { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import Produit from '../components/Produit'
import Panier from '../components/Panier'
import { useRouter } from 'next/router'

export default function Home() {

  const routeur = useRouter()
  const [articleCherche, setArticleCherche] = useState("")

  const [produits, setProduits] = useState([])

  const [panier, setPanier] = useState([])
  const [panierVisible, setPanierVisible] = useState(false)
  const [montantPanier, setMontantPanier] = useState(0)

  const [prixMinimum, setPrixMinimum] = useState(0)
  const [prixMaximum, setPrixMaximum] = useState(9999)

  const userMail = routeur.query.mail

  // Fonction requetes API ____________________________________________________

  const chargerProduits = async () => {
    const requete = await fetch('/api/chargerProduits')
    if (!requete.ok) {
      const message = await requete.json()
      alert(message.message)
    }
    else {
      const retour = await requete.json()
      setProduits(retour)
    }
  }

  const appliquerFiltres = () => {
    const produitsFiltres = produits.filter(produit =>
      produit.prix >= prixMinimum && produit.prix <= prixMaximum
    );
    console.log(produitsFiltres)
    setProduits(produitsFiltres)
  }

  const faireChercher = async () => {
    const requete = await fetch(`/api/chercherProduit?recherche=${articleCherche}`)
    const response = await requete.json()
    setProduits(response)
  }

  const passerCommande = async () => {
    const requete = await fetch('/api/creerCommande', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        produits: panier,
        mailClient: userMail
      })
    })

    if (!requete.ok) {
      const retour = await requete.json()
      alert(retour.message)
    }
    else {
      const message = await requete.json()
      console.log(message)
      setPanier([])
    }
  }

  useEffect(() => {
    chargerProduits()
  }, [])

  useEffect(() => {
    if (panier.length != 0) {
      setMontantPanier(montantPanier + panier[panier.length - 1].prix)
    }
  }, [panier])

  return (
    <>
      <Head>
        <title>CyberNet - Accueil</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <div className='w-screen h-screen flex flex-col font-sans bg-white'>
        <TopBar userMail={userMail} panier={panier} articleCherche={articleCherche} setArticleCherche={setArticleCherche} faireRecherche={faireChercher} panierVisible={panierVisible} setPanierVisible={setPanierVisible} />
        {panierVisible ? <Panier liste={panier} passerCommande={passerCommande} montantPanier={montantPanier} setMontantPanier={setMontantPanier} /> : null}
        <div className='h-5/6 w-full flex flex-row'>
          <div className='w-1/6 h-5/6 flex flex-col bg-blue-600 rounded-lg p-4 pt-4 mt-5 ml-2 gap-4'>
            <h3 className='w-full text-center'><strong>Filtres</strong></h3>
            <label><u><strong>Prix :</strong></u></label>
            <span className='flex flex-row gap-2'>
              <label>Min</label>
              <input type='text' className='text-black rounded-lg p-1' value={prixMinimum} onChange={(e) => setPrixMinimum(e.target.value)} />
            </span>
            <span className='flex flex-row gap-2'>
              <label>Max</label>
              <input type='text' className='text-black rounded-lg p-1' value={prixMaximum} onChange={(e) => setPrixMaximum(e.target.value)} />
            </span>
            <span className='w-full flex flex-row justify-center p-5'>
              <button className='bg-white bg-opacity-55 w-1/2 h-fit rounded-lg text-black p-1 hover:scale-105 hover:bg-white transition-transform' onClick={() => appliquerFiltres()}>Appliquer</button>
            </span>
          </div>
          <div className='w-5/6 h-full flex flex-row flex-wrap gap-3 pl-5 pt-5'>
            {produits.map((e, index) => <Produit element={e} key={index} panier={panier} setPanier={setPanier} />)}
          </div>
        </div>
      </div>
    </>
  )
}
