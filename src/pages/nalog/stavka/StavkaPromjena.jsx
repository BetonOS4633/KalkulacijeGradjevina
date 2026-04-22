// import { useEffect, useState } from "react"
// import { Form, Button, Row, Col } from "react-bootstrap"
// import { useNavigate, useParams, Link } from "react-router-dom"
// import StavkaService from "../../../services/stavka/StavkaService"

// export default function StavkaPromjena() {
//     const navigate = useNavigate()
//     const { sifraNalog, sifraStavka } = useParams() // Usklađeno s tvojim constants.js
//     const [stavka, setStavka] = useState(null)

//     useEffect(() => {
//         dohvatiStavku()
//     }, [])

//     async function dohvatiStavku() {
//         const odgovor = await StavkaService.getBySifra(sifraStavka)
//         if (odgovor.success) {
//             setStavka(odgovor.data)
//         }
//     }

//     async function obradiPodatke(e) {
//         e.preventDefault()
//         const podaci = new FormData(e.target)

//         const urediStavku = {
//             ...stavka,
//             sifraRadnika: parseInt(podaci.get('sifraRadnika')),
//             sifraStroja: parseInt(podaci.get('sifraStroja')),
//             vrijemePocetka: podaci.get('vrijemePocetka'),
//             vrijemeZavrsetka: podaci.get('vrijemeZavrsetka'),
//             sati: parseFloat(podaci.get('sati')),
//             iznos: parseFloat(podaci.get('iznos'))
//         }

//         const odgovor = await StavkaService.promjeni(sifraStavka, urediStavku)
//         if (odgovor.success) {
//             navigate(`/nalog/${sifraNalog}/stavke`)
//         }
//     }

//     if (!stavka) return <p>Učitavanje...</p>

//     return (
//         <div className="container mt-3">
//             <h3>Uredi stavku br. {sifraStavka}</h3>
//             <hr />
//             <Form onSubmit={obradiPodatke}>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Radnik</Form.Label><Form.Control type="number" name="sifraRadnika" defaultValue={stavka.sifraRadnika} required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Stroj</Form.Label><Form.Control type="number" name="sifraStroja" defaultValue={stavka.sifraStroja} required /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Sati</Form.Label><Form.Control type="number" step="0.01" name="sati" defaultValue={stavka.sati} required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Iznos (€)</Form.Label><Form.Control type="number" step="0.01" name="iznos" defaultValue={stavka.iznos} required /></Form.Group></Col>
//                 </Row>
//                 <div className="mt-3">
//                     <Button variant="primary" type="submit" className="me-2">Spremi izmjene</Button>
//                     <Link to={`/nalog/${sifraNalog}/stavke`} className="btn btn-secondary">Odustani</Link>
//                 </div>
//             </Form>
//         </div>
//     )
// }
import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
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

    async function obradiPodatke(e) {
        e.preventDefault()
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

        const odgovor = await StavkaService.promjeni(sifraStavka, urediStavku)
        if (odgovor.success) {
            navigate(`/nalog/${sifraNalog}/stavke`)
        }
    }

    if (!stavka) return <p>Učitavanje...</p>

    return (
        <div className="container mt-3">
            <h3>Uredi stavku br. {sifraStavka}</h3>
            <hr />
            <Form onSubmit={obradiPodatke}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Radnik</Form.Label>
                            <Form.Select name="sifraRadnika" defaultValue={stavka.sifraRadnika} required>
                                {radnici.map(r => (
                                    <option key={r.sifra} value={r.sifra}>{r.ime} {r.prezime}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Stroj</Form.Label>
                            <Form.Select name="sifraStroja" defaultValue={stavka.sifraStroja} required>
                                {strojevi.map(s => (
                                    <option key={s.sifra} value={s.sifra}>{s.naziv}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Sati</Form.Label><Form.Control type="number" step="0.01" name="sati" defaultValue={stavka.sati} required /></Form.Group></Col>
                    <Col md={6}><Form.Group className="mb-3"><Form.Label>Iznos (€)</Form.Label><Form.Control type="number" step="0.01" name="iznos" defaultValue={stavka.iznos} required /></Form.Group></Col>
                </Row>
                <div className="mt-3">
                    <Button variant="primary" type="submit" className="me-2">Spremi izmjene</Button>
                    <Link to={`/nalog/${sifraNalog}/stavke`} className="btn btn-secondary">Odustani</Link>
                </div>
            </Form>
        </div>
    )
}
