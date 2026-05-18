
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

    // Automatski računa iznos kada se promijeni stroj
    function handleStrojChange(e) {
        const novaSifraStroja = parseInt(e.target.value)
        const odabraniStroj = strojevi.find(s => s.sifra === novaSifraStroja)
        
        let noviIznos = stavka.iznos
        if (odabraniStroj && odabraniStroj.cijena) {
            noviIznos = (parseFloat(stavka.sati) || 0) * odabraniStroj.cijena
        }

        setStavka({
            ...stavka,
            sifraStroja: novaSifraStroja,
            iznos: noviIznos
        })
    }

    // Automatski računa iznos kada korisnik ručno upiše broj sati
    function handleSatiChange(e) {
        const noviSati = e.target.value
        const odabraniStroj = strojevi.find(s => s.sifra === stavka.sifraStroja)

        let noviIznos = stavka.iznos
        if (odabraniStroj && odabraniStroj.cijena) {
            noviIznos = (parseFloat(noviSati) || 0) * odabraniStroj.cijena
        }

        setStavka({
            ...stavka,
            sati: noviSati,
            iznos: noviIznos
        })
    }

    // Omogućuje ručnu promjenu iznosa u polju
    function handleIznosChange(e) {
        setStavka({
            ...stavka,
            iznos: e.target.value
        })
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
            await StavkaService.promjeni(sifraStavka, urediStavku)
            navigate(`/nalog/${sifraNalog}/stavke`)
        } catch (err) {
            setGreska('Došlo je do greške na serveru prilikom spremanja.')
            console.error(err)
        }
    }

    if (!stavka) return <p className="container mt-3">Učitavanje...</p>

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
                            <Form.Select 
                                name="sifraRadnika" 
                                value={stavka.sifraRadnika || ''} 
                                onChange={(e) => setStavka({ ...stavka, sifraRadnika: parseInt(e.target.value) })}
                                required
                            >
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
                            <Form.Select 
                                name="sifraStroja" 
                                value={stavka.sifraStroja || ''} 
                                onChange={handleStrojChange} 
                                required
                            >
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
                            <Form.Control 
                                type="datetime-local" 
                                name="vrijemePocetka" 
                                value={formatirajDatumZaInput(stavka.vrijemePocetka)} 
                                onChange={(e) => setStavka({ ...stavka, vrijemePocetka: e.target.value })}
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vrijeme završetka</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="vrijemeZavrsetka" 
                                value={formatirajDatumZaInput(stavka.vrijemeZavrsetka)} 
                                onChange={(e) => setStavka({ ...stavka, vrijemeZavrsetka: e.target.value })}
                                required 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj sati</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.01" 
                                name="sati" 
                                value={stavka.sati || ''} 
                                onChange={handleSatiChange}
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Iznos (€)</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.01" 
                                name="iznos" 
                                value={stavka.iznos ?? ''} 
                                onChange={handleIznosChange}
                                required 
                            />
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
