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

            const { mail, password } = req.body

            const [rows] = await bdd.query('SELECT idClient FROM client WHERE mail = ? AND password = ?', [mail, password])

            if (rows.length != 0) {
                const idClient = rows[0].idClient
                res.status(200).json({ message: 'Connexion réussi avec succès !' })
            }
            else {
                res.status(401).json({ message: 'Erreur au niveau du mail ou du mot de passe' })
            }
        }
        catch (e) {
            res.status(500).send(e)
        }
    }
    else {
        res.status(405).json({ message: 'Erreur au niveau de la méthode de la requête' })
    }
}