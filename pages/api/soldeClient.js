import mysql from 'mysql2/promise'

export default async function handle(req, res) {
    if (req.method === 'GET') {
        const bdd = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ecom_bdd'
        })

        const { mail } = req.query

        try {
            const [soldeClient] = await bdd.query('SELECT solde as so FROM client WHERE mail = ?', [mail])
            res.status(200).json({ solde: soldeClient[0].so })
        }
        catch (e) {
            const retour = e.message
            res.status(500).json({ message: retour })
        }
    }
    else {
        res.status(405).json({ message: 'Erreur au niveau de la méthode de requête' })
    }
}