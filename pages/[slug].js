import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import TopBar from '../components/TopBar'

export default function pageDynamique() {

    const routeur = useRouter()
    const { slug } = routeur.query
    const { prix } = routeur.query
    const { mail } = routeur.query

    return (
        <>
            <Head>
                <title>{slug}</title>
            </Head>
            <div className='w-screen h-screen flex flex-col items-center bg-white text-black font-sans'>
                <TopBar userMail={mail}></TopBar>
                <div className='w-full h-3/4 flex flex-row gap-8'>
                    <Image src={`/${slug}.jpg`} alt='Image du produit' width='300' height='100' className='w-2/5 rounded-lg' />
                    <div className='w-3/5 flex flex-col gap-2 text-black pt-10'>
                        <h2 className='text-xl'><strong>{slug}</strong></h2>
                        <p>{prix}€</p>
                        <br />

                    </div>
                </div>
            </div>
        </>
    )
}