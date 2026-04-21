import { useEffect, useState } from "react"
import { Button, Table, Alert } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../../constants"
import StavkaService from "../../../services/stavka/StavkaService" // Putanja do tvog servisa

export default function StavkaPregled() {
    const navigate = useNavigate()
    const params = useParams()
    const [stavke, setStavke] = useState([])
    const [ucitavanje, setUcitavanje] = useState(true)

    useEffect(() => {
        dohvatiStavkeIzBaze()
    }, [params.sifra])

    async function dohvatiStavkeIzBaze() {
        setUcitavanje(true)
        // Ovdje se događa "ruta" - dohvaćanje podataka s backenda
        const odgovor = await StavkaService.getPoNalogu(params.sifra)
        
        if(odgovor.ok) {
            setStavke(odgovor.podaci) // Pretpostavka da servis vraća objekt s podacima
        } else {
            console.log(odgovor.greska)
        }
        setUcitavanje(false)
    }

    return (
        <>
            <Link to={RouteNames.NALOG} className="btn btn-danger">Vrati</Link>
            <h2 className="mt-3">Stavke za nalog br. {params.sifra}</h2>
            <hr />

            {ucitavanje ? (
                <p>Učitavanje stavki....</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Stavka</th>
                            <th>Radnik</th>
                            <th>Stroj</th>
                            <th>Početak</th>
                            <th>Završetak</th>
                            <th>Sati</th>
                            <th>Iznos</th>
                            <th>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stavke && stavke.map((s) => (
                            <tr key={stavke.sifra}>
                                <td>{stavke.sifra}</td>
                                <td>{stavke.sifraRadnika}</td>
                                <td>{stavke.sifraStroja}</td>
                                <td>{new Date(stavke.vrijemePocetka).toLocaleString('hr-HR')}</td>
                                <td>{new Date(stavke.vrijemeZavrsetka).toLocaleString('hr-HR')}</td>
                                <td>{stavke.sati} h</td>
                                <td>{Number(stavke.iznos).toFixed(2)} €</td>
                                <td>
                                    <Button variant="primary" size="sm" onClick={() => navigate(`/stavka/promjena/${stavke.sifra}`)}>
                                        Uredi
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            
            {!ucitavanje && stavke.length === 0 && (
                <Alert variant="info">Ovaj nalog još nema unesenih stavki.</Alert>
            )}
        </>
    )
}
