import { useEffect, useState } from "react"
import { Button, Table, Alert, Card, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../../constants"
import StavkaService from "../../../services/stavka/StavkaService"
import NalogService from "../../../services/nalog/NalogService"
import PoduzeceService from "../../../services/poduzece/PoduzeceService"
import GradilisteService from "../../../services/gradiliste/GradilistaService"

export default function StavkaPregled() {
    const navigate = useNavigate()
    const params = useParams()
    
    const [stavke, setStavke] = useState([])
    const [podaciONalogu, setPodaciONalogu] = useState(null)
    const [ucitavanje, setUcitavanje] = useState(true)

    // Ukupni iznos radova za ovaj nalog
    const ukupniIznos = stavke.reduce((acc, s) => acc + Number(s.iznos || 0), 0);

    useEffect(() => {
        dohvatiSvePodatke()
    }, [params.sifra])

    async function dohvatiSvePodatke() {
        setUcitavanje(true)
        
        // 1. Informacije za gornji dio (Nalog -> Poduzeće i Gradilište)
        const nalogOdgovor = await NalogService.getBySifra(params.sifra)
        if (nalogOdgovor.success) {
            const nalog = nalogOdgovor.data
            const [poduzeceOdg, gradilisteOdg] = await Promise.all([
                PoduzeceService.getBySifra(nalog.sifraPoduzeca),
                GradilisteService.getBySifra(nalog.sifraGradilista)
            ])

            setPodaciONalogu({
                poduzece: poduzeceOdg.success ? poduzeceOdg.data.naziv : 'N/A',
                zgrada: gradilisteOdg.success ? gradilisteOdg.data.naziv : 'N/A'
            })
        }

        // 2. Dohvat tvojih stavki (filtrirano po nalogu)
        const stavkeOdgovor = await StavkaService.getPoNalogu(params.sifra)
        if (stavkeOdgovor.success) {
            setStavke(stavkeOdgovor.data)
        }

        setUcitavanje(false)
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati stavku?')) return
        const odgovor = await StavkaService.obrisi(sifra)
        if (odgovor.success) {
            dohvatiSvePodatke()
        }
    }

    return (
        <div className="container">
            <Link to={RouteNames.NALOG} className="btn btn-danger mt-3">Vrati</Link>
            
            {/* Gornji informativni dio */}
            <Card className="mt-3 mb-4 shadow-sm bg-light">
                <Card.Body>
                    <Row className="text-center">
                        <Col md={4}>
                            <div className="text-muted small text-uppercase">Nalog broj</div>
                            <h4 className="fw-bold">{params.sifra}</h4>
                        </Col>
                        <Col md={4} className="border-start border-end">
                            <div className="text-muted small text-uppercase">Poduzeće</div>
                            <h4 className="fw-bold">{podaciONalogu?.poduzece || '...'}</h4>
                        </Col>
                        <Col md={4}>
                            <div className="text-muted small text-uppercase">Zgrada / Objekt</div>
                            <h4 className="fw-bold">{podaciONalogu?.zgrada || '...'}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {ucitavanje ? (
                <p className="text-center">Učitavanje podataka....</p>
            ) : (
                <>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>Stavka</th>
                                <th>Radnik</th>
                                <th>Stroj</th>
                                <th>Početak</th>
                                <th>Završetak</th>
                                <th>Sati</th>
                                <th className="text-end">Iznos</th>
                                <th className="text-center">Akcija</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stavke.map((s) => (
                                <tr key={s.sifra}>
                                    <td>{s.sifra}</td>
                                    <td>{s.sifraRadnika}</td>
                                    <td>{s.sifraStroja}</td>
                                    <td>{new Date(s.vrijemePocetka).toLocaleString('hr-HR')}</td>
                                    <td>{new Date(s.vrijemeZavrsetka).toLocaleString('hr-HR')}</td>
                                    <td>{s.sati} h</td>
                                    <td className="text-end">{Number(s.iznos).toFixed(2)} €</td>
                                    <td className="text-center">
                                        <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/stavka/promjena/${s.sifra}`)}>
                                            Uredi
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => brisanje(s.sifra)}>
                                            Obriši
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="table-secondary fw-bold">
                                <td colSpan="6" className="text-end">UKUPAN IZNOS RADOVA:</td>
                                <td className="text-end text-primary">
                                    {ukupniIznos.toFixed(2)} €
                                </td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </Table>
                    
                    {stavke.length === 0 && (
                        <Alert variant="info" className="text-center">Nema unesenih stavki za ovaj nalog.</Alert>
                    )}
                </>
            )}
        </div>
    )
}
