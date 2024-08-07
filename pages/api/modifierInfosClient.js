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
            const { userMail, nouveauMail, mdpActuel, nouveauMdp } = req.body

            if (nouveauMail !== "") {
                await bdd.query('UPDATE client SET mail = ? WHERE mail = ?', [nouveauMail, userMail])
                res.status(200).json({ message: "Adresse mail modifier avec succès !", newMail: nouveauMail })
            }

            if (mdpActuel !== "" && nouveauMdp !== "") {
                const [testMotDePasseCorrect] = await bdd.query('SELECT idClient as idCli, password FROM client WHERE mail = ? AND password = ?', [userMail, mdpActuel])
                if (testMotDePasseCorrect.length > 0) {
                    await bdd.execute('UPDATE client SET password = ? WHERE mail = ?', [nouveauMdp, userMail])
                    res.status(200).json({ message: "Mot de passe modifier avec succès !", newMail: null })
                }
                else {
                    res.status(500).json({ message: "Mot de passe incorrect" })
                }
            }
            else if (mdpActuel !== "" && nouveauMdp === "") {
                res.status(500).json({ message: "Le champ nouveau mot de passe est vide" })
            }
            else if (mdpActuel === "" && nouveauMdp !== "") {
                res.status(500).json({ message: "Le champ du mot de passe actuel est vide" })
            }

        }
        catch (e) {
            const retour = e.message
            res.status(500).json({ message: retour })
        }
    }
    else {
        res.status(405).json({ message: "La méthode de la requête n'est pas prise en charge" })
    }
}