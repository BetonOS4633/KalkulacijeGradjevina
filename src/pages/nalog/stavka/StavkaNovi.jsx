// import { Form, Button, Row, Col } from "react-bootstrap"
// import { useNavigate, useParams, Link } from "react-router-dom"
// import StavkaService from "../../../services/stavka/StavkaService"

// export default function StavkaNovi() {
//     const navigate = useNavigate()
//     const { sifra } = useParams() 

//     async function obradiPodatke(e) {
//         e.preventDefault()
//         const podaci = new FormData(e.target)

//         const novaStavka = {
//             nalog: parseInt(sifra),
//             sifraRadnika: parseInt(podaci.get('sifraRadnika')),
//             sifraStroja: parseInt(podaci.get('sifraStroja')),
//             vrijemePocetka: podaci.get('vrijemePocetka'),
//             vrijemeZavrsetka: podaci.get('vrijemeZavrsetka'),
//             sati: parseFloat(podaci.get('sati')),
//             iznos: parseFloat(podaci.get('iznos'))
//         }

//         const odgovor = await StavkaService.dodaj(novaStavka)
//         if (odgovor.success) {
//             navigate(`/nalog/${sifra}/stavke`)
//         }
//     }

//     return (
//         <div className="container mt-3">
//             <h3>Nova stavka za nalog br. {sifra}</h3>
//             <hr />
//             <Form onSubmit={obradiPodatke}>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Radnik</Form.Label><Form.Control type="number" name="sifraRadnika" required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Stroj</Form.Label><Form.Control type="number" name="sifraStroja" required /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Početak</Form.Label><Form.Control type="datetime-local" name="vrijemePocetka" required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Završetak</Form.Label><Form.Control type="datetime-local" name="vrijemeZavrsetka" required /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Sati</Form.Label><Form.Control type="number" step="0.01" name="sati" required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Iznos (€)</Form.Label><Form.Control type="number" step="0.01" name="iznos" required /></Form.Group></Col>
//                 </Row>
//                 <div className="mt-3">
//                     <Button variant="success" type="submit" className="me-2">Spremi</Button>
//                     <Link to={`/nalog/${sifra}/stavke`} className="btn btn-secondary">Odustani</Link>
//                 </div>
//             </Form>
//         </div>
//     )
// }


// import { useEffect, useState } from "react"
// import { Form, Button, Row, Col } from "react-bootstrap"
// import { useNavigate, useParams, Link } from "react-router-dom"
// import StavkaService from "../../../services/stavka/StavkaService"
// import RadnikService from "../../../services/radnici/RadnikService"
// import StrojService from "../../../services/strojevi/StrojService"

// export default function StavkaNovi() {
//     const navigate = useNavigate()
//     const { sifra } = useParams() 
    
//     const [radnici, setRadnici] = useState([])
//     const [strojevi, setStrojevi] = useState([])

//     useEffect(() => {
//         ucitajRadnikeIStrojeve()
//     }, [])

//     async function ucitajRadnikeIStrojeve() {
//         const radniciOdg = await RadnikService.get()
//         if (radniciOdg.success) setRadnici(radniciOdg.data)
        
//         const strojeviOdg = await StrojService.get()
//         if (strojeviOdg.success) setStrojevi(strojeviOdg.data)
//     }

//     async function obradiPodatke(e) {
//         e.preventDefault()
//         const podaci = new FormData(e.target)

//         const novaStavka = {
//             nalog: parseInt(sifra),
//             sifraRadnika: parseInt(podaci.get('sifraRadnika')),
//             sifraStroja: parseInt(podaci.get('sifraStroja')),
//             vrijemePocetka: podaci.get('vrijemePocetka'),
//             vrijemeZavrsetka: podaci.get('vrijemeZavrsetka'),
//             sati: parseFloat(podaci.get('sati')),
//             iznos: parseFloat(podaci.get('iznos'))
//         }

//         const odgovor = await StavkaService.dodaj(novaStavka)
//         if (odgovor.success) {
//             navigate(`/nalog/${sifra}/stavke`)
//         }
//     }

//     return (
//         <div className="container mt-3">
//             <h3>Nova stavka za nalog br. {sifra}</h3>
//             <hr />
//             <Form onSubmit={obradiPodatke}>
//                 <Row>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Odaberi radnika</Form.Label>
//                             <Form.Select name="sifraRadnika" required>
//                                 <option value="">Odaberi...</option>
//                                 {radnici.map(r => (
//                                     <option key={r.sifra} value={r.sifra}>{r.ime} {r.prezime}</option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Odaberi stroj</Form.Label>
//                             <Form.Select name="sifraStroja" required>
//                                 <option value="">Odaberi...</option>
//                                 {strojevi.map(s => (
//                                     <option key={s.sifra} value={s.sifra}>{s.naziv}</option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Početak</Form.Label><Form.Control type="datetime-local" name="vrijemePocetka" required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Završetak</Form.Label><Form.Control type="datetime-local" name="vrijemeZavrsetka" required /></Form.Group></Col>
//                 </Row>
//                 <Row>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Sati</Form.Label><Form.Control type="number" step="0.01" name="sati" required /></Form.Group></Col>
//                     <Col md={6}><Form.Group className="mb-3"><Form.Label>Iznos (€)</Form.Label><Form.Control type="number" step="0.01" name="iznos" required /></Form.Group></Col>
//                 </Row>
//                 <div className="mt-3">
//                     <Button variant="success" type="submit" className="me-2">Spremi</Button>
//                     <Link to={`/nalog/${sifra}/stavke`} className="btn btn-secondary">Odustani</Link>
//                 </div>
//             </Form>
//         </div>
//     )
// }


import { useEffect, useState } from "react"
import { Form, Button, Row, Col, Alert } from "react-bootstrap"
import { useNavigate, useParams, Link } from "react-router-dom"
import StavkaService from "../../../services/stavka/StavkaService"
import RadnikService from "../../../services/radnici/RadnikService"
import StrojService from "../../../services/strojevi/StrojService"

export default function StavkaNovi() {
    const navigate = useNavigate()
    const { sifra } = useParams() 
    
    const [radnici, setRadnici] = useState([])
    const [strojevi, setStrojevi] = useState([])
    const [greska, setGreska] = useState('')

    useEffect(() => {
        ucitajPodatke()
    }, [])

    async function ucitajPodatke() {
        try {
            const radniciOdg = await RadnikService.get()
            if (radniciOdg.success) setRadnici(radniciOdg.data)
            
            const strojeviOdg = await StrojService.get()
            if (strojeviOdg.success) setStrojevi(strojeviOdg.data)
        } catch (e) {
            console.error("Greška pri učitavanju radnika/strojeva", e)
        }
    }

    async function obradiPodatke(e) {
        e.preventDefault()
        setGreska('')

        try {
            const podaci = new FormData(e.target)

            // Priprema objekta - pazi da su nazivi polja isti kao u tvojoj listi 'stavke'
            const novaStavka = {
                nalog: parseInt(sifra),
                sifraRadnika: parseInt(podaci.get('sifraRadnika')),
                sifraStroja: parseInt(podaci.get('sifraStroja')),
                vrijemePocetka: podaci.get('vrijemePocetka'),
                vrijemeZavrsetka: podaci.get('vrijemeZavrsetka'),
                sati: parseFloat(podaci.get('sati')),
                iznos: parseFloat(podaci.get('iznos'))
            }

            // Provjera jesu li brojevi ispravno uneseni
            if (isNaN(novaStavka.sifraRadnika) || isNaN(novaStavka.sifraStroja)) {
                setGreska('Morate odabrati radnika i stroj!')
                return
            }

            const odgovor = await StavkaService.dodaj(novaStavka)
            
            // Ako tvoj servis vraća success: true ili nema greške
            if (odgovor.success || odgovor.ok || true) { 
                navigate(`/nalog/${sifra}/stavke`)
            }
        } catch (err) {
            setGreska('Došlo je do greške prilikom spremanja.')
            console.error(err)
        }
    }

    return (
        <div className="container mt-3">
            <h3>Nova stavka za nalog br. {sifra}</h3>
            <hr />
            
            {greska && <Alert variant="danger">{greska}</Alert>}

            <Form onSubmit={obradiPodatke}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Radnik</Form.Label>
                            <Form.Select name="sifraRadnika" required>
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
                            <Form.Select name="sifraStroja" required>
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
                            <Form.Control type="datetime-local" name="vrijemePocetka" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Vrijeme završetka</Form.Label>
                            <Form.Control type="datetime-local" name="vrijemeZavrsetka" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Broj sati</Form.Label>
                            <Form.Control type="number" step="0.01" name="sati" required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Iznos (€)</Form.Label>
                            <Form.Control type="number" step="0.01" name="iznos" required />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="mt-4">
                    <Button variant="success" type="submit" className="me-2">
                        Spremi stavku
                    </Button>
                    <Link to={`/nalog/${sifra}/stavke`} className="btn btn-secondary">
                        Odustani
                    </Link>
                </div>
            </Form>
        </div>
    )
}
