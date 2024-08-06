import mysql from 'mysql2/promise'

export default async function handle(req, res) {
    if (req.method === 'GET') {
        try {
            const bdd = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'ecom_bdd'
            })

            const { recherche } = req.query
            const articleCherche = `%${recherche}%`;

            const [rows] = await bdd.query("SELECT nom, imagePath, prix FROM produit WHERE nom LIKE ? ", [articleCherche])

            const produits = rows.map((row, index) => ({
                "nom": row.nom,
                "path": row.imagePath,
                "prix": row.prix
            }))

            res.status(200).send(produits)
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    else {
        res.status(500).json({ message: 'Erreur au niveau de la methode de la requete http' })
    }
}