import mysql from 'mysql2/promise'

export default async function handle(req, res) {
    if (req.method === 'POST') {
        try {
            const bdd = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'ecom_bdd'
            })

            const { produits, mailClient } = req.body
            let sommeCommande = 0

            const [dernierIdCommande] = await bdd.query('SELECT max(idCommande) as idCom FROM commande')
            const idCommande = dernierIdCommande[0].idCom + 1

            const [rechercheIdClient] = await bdd.query('SELECT idClient FROM client WHERE mail = ?', [mailClient])
            const idCli = rechercheIdClient[0].idClient

            const [rechercheSoldeClient] = await bdd.query('SELECT solde FROM client WHERE idClient = ?', [idCli])
            const soldeClient = rechercheSoldeClient[0].solde

            for (let i = 0; i < produits.length; i++) {
                const [prixProduit] = await bdd.query('SELECT prix as p FROM produit WHERE nom = ?', [produits[i].nom])
                sommeCommande += prixProduit[0].p
            }

            if (soldeClient > sommeCommande) {
                await bdd.execute('INSERT INTO commande (idCommande, idClient, montant) VALUES (?, ?, ?)', [idCommande, , idCli, sommeCommande])

                // Sauvegarde des produits commandés
                for (let i = 0; i < produits.length; i++) {
                    const [infosProduit] = await bdd.query('SELECT idProduit as idp FROM produit WHERE nom = ?', [produits[i].nom])
                    const idProd = infosProduit[0].idp

                    const [identifiantDernierProduitCommande] = await bdd.query("SELECT max(idProduitCommande) AS dernier FROM produitCommande")
                    const idProduitCommande = identifiantDernierProduitCommande[0].dernier + 1
                    await bdd.execute('INSERT INTO produitCommande (idProduitCommande, idCommande, idProduit) VALUES (?, ?, ?)', [idProduitCommande, idCommande, idProd])
                }

                await bdd.execute('UPDATE client SET solde = solde - ? WHERE idClient = ?', [sommeCommande, idCli])
                res.status(200).json({ message: 'Commande finalisé avec succès !' })
            }
            else {
                res.status(406).json({ message: 'Solde insufisant sur votre compte ..' })
            }
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
    else {
        res.status(405).json({ message: "La méthode de la requête n'est pas correcte ..." })
    }
}