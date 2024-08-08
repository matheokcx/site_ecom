import mysql from 'mysql2/promise'

export default async function handle(req, res) {
    if (req.method === 'POST') {
        const bdd = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ecom_bdd'
        })

        try {
            const { mail, password } = req.body

            const [testClientExiste] = await bdd.query('SELECT idClient FROM client WHERE mail = ?', [mail])

            if (testClientExiste.length != 0) {
                res.status(401).json({ message: "Vous avez déjà un compte, connectez-vous !" })
            }
            else {
                const [maxIdClient] = await bdd.query('SELECT max(idClient) as max FROM client')
                const idClient = maxIdClient[0].max + 1
                await bdd.execute('INSERT INTO client (idClient, mail, password, solde) VALUES (?, ?, ?, 0.0);', [idClient, mail, password])

                res.status(200).json({ message: "Compte créer avec succès !" })
            }
        }
        catch (e) {
            const retour = e.message
            res.status(500).json({ message: retour })
        }
    }
    else {
        res.status(405).json({ message: "La méthode de la requête est incorrecte" })
    }
}