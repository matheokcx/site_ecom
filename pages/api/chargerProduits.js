import mysql from 'mysql2/promise'

export default async function handle(req, res) {
    const bdd = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'ecom_bdd'
    })

    const [rows] = await bdd.query('SELECT idProduit, nom, imagePath, prix FROM produit')
    const produits = rows.map((row) => ({
        "nom": row.nom,
        "path": row.imagePath,
        "prix": row.prix
    }))

    res.status(200).send(produits)
}