import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Alert } from "react-bootstrap"
import { useNavigate, useParams, Link } from "react-router-dom"
import StavkaService from "../../../services/stavka/StavkaService"
import RadnikService from "../../../services/radnici/RadnikService"
import StrojService from "../../../services/strojevi/StrojService"

export default function StavkaPromjena() {
    const navigate = useNavigate()
    const { sifraNalog, sifraStavka } = useParams()
    
    const [stavka, setStavka] = useState(null)
    const [radnici, setRadnici] = useState([])
    const [strojevi, setStrojevi] = useState([])
    const [greska, setGreska] = useState('')

    useEffect(() => {
        dohvatiSvePodatke()
    }, [])

    async function dohvatiSvePodatke() {
        const radniciOdg = await RadnikService.get()
        if (radniciOdg.success) setRadnici(radniciOdg.data)
        
        const strojeviOdg = await StrojService.get()
        if (strojeviOdg.success) setStrojevi(strojeviOdg.data)

        const odgovorStavka = await StavkaService.getBySifra(sifraStavka)
        if (odgovorStavka.success) {
            setStavka(odgovorStavka.data)
        }
    }

    function formatirajDatumZaInput(datumString) {
        if (!datumString) return ""
        const datum = new Date(datumString)
        const godina = datum.getFullYear()
        const mjesec = String(datum.getMonth() + 1).padStart(2, '0')
        const dan = String(datum.getDate()).padStart(2, '0')
        const sati = String(datum.getHours()).padStart(2, '0')
        const minute = String(datum.getMinutes()).padStart(2, '0')
        return `${godina}-${mjesec}-${dan}T${sati}:${minute}`
    }

    async function obradiPodatke(e) {
        e.preventDefault()
        setGreska('')
        const podaci = new FormData(e.target)

        const urediStavku = {
            ...stavka,
            sifraRadnika: parseInt(podaci.get('sifraRadnika')),
            sifraStroja: parseInt(podaci.get('sifraStroja')),
            vrijemePocetka: podaci.get('vrijemePocetka'),
            vrijemeZavrsetka: podaci.get('vrijemeZavrsetka'),
            sati: parseFloat(podaci.get('sati')),
            iznos: parseFloat(podaci.get('iznos'))
        }

        try {
            // Šaljemo izmjene
            await StavkaService.promjeni(sifraStavka, urediStavku)
            
            // Bez obzira što API vrati (čak i ako vrati undefined), prisilno vas vraćamo nazad
            navigate(`/nalog/${sifraNalog}/stavke`)
        } catch (err) {
            setGreska('Došlo je do greške na serveru prilikom spremanja.')
            console.error(err)
        }
    }

    if (!stavka) return <p>Učitavanje...</p>

    return (
        <div className="container mt-3">
            <h3>Uredi stavku br. {sifraStavka}</h3>
            <hr />
            
            {greska && <Alert variant="danger">{greska}</Alert>}

            <Form onSubmit={obradiPodatke}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Radnik</Form.Label>
                            <Form.Select name="sifraRadnika" defaultValue={stavka.sifraRadnika} required>
                                <option value="">-- Odaberi radnika --</option>
                                {radnici && radnici.map(r => (
                                    <option key={r.sifra} value={r.sifra}>
                                        {r.ime} {r.prezime}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Stroj</Form.Label>
                            <Form.Select name="sifraStroja" defaultValue={stavka.sifraStroja} required>
                                <option value="">-- Odaberi stroj --</option>
                                {strojevi && strojevi.map(s => (
                                    <option key={s.sifra} value={s.sifra}>
                                        {s.naziv}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vrijeme početka</Form.Label>
                            <Form.Control type="datetime-local" name="vrijemePocetka" defaultValue={formatirajDatumZaInput(stavka.vrijemePocetka)} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vrijeme završetka</Form.Label>
                            <Form.Control type="datetime-local" name="vrijemeZavrsetka" defaultValue={formatirajDatumZaInput(stavka.vrijemeZavrsetka)} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj sati</Form.Label>
                            <Form.Control type="number" step="0.01" name="sati" defaultValue={stavka.sati} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Iznos (€)</Form.Label>
                            <Form.Control type="number" step="0.01" name="iznos" defaultValue={stavka.iznos} required />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-4">
                    <Button variant="success" type="submit" className="me-2">Spremi promjene</Button>
                    <Link to={`/nalog/${sifraNalog}/stavke`} className="btn btn-secondary">Odustani</Link>
                </div>
            </Form>
        </div>
    )
}
