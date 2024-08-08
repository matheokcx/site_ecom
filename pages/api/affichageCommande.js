import mysql from 'mysql2/promise'

export default async function handle(req, res) {
    if (req.method === 'GET') {
        const bdd = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'ecom_bdd'
        })

        try {

            const { mail } = req.query

            const [rows] = await bdd.query("SELECT idCommande, montant, DATE_FORMAT(dateCommande, '%Y/%m/%d') as dateCommande, etat FROM commande WHERE idClient = (SELECT idClient FROM client WHERE mail = ?) AND idCommande > 1;", [mail])

            const retour = rows.map((e) => ({
                idCom: e.idCommande,
                mont: e.montant,
                dateCom: e.dateCommande,
                etat: e.etat
            }))

            res.status(200).send(retour)
        }
        catch (e) {
            const retour = e.message
            res.status(500).json({ message: retour })
        }
    }
    else {
        res.status(405).json({ message: "Méthode de la requête incorrecte" })
    }
}