import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import NalogService from "../../services/nalog/NalogService"
import { useEffect, useState } from "react"
import PoduzeceService from "../../services/poduzece/PoduzeceService"
import GradilistaService from "../../services/gradiliste/GradilistaService"

export default function NalogNovi() {

    const navigate = useNavigate()
    const [poduzeca, setPoduzeca] = useState([])
    const [gradilista, setGradilista] = useState([])

    useEffect(() => {
        ucitajGradiliste()
        ucitajPoduzeca()
    }, [])



    async function ucitajPoduzeca() {
        await PoduzeceService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setPoduzeca(odgovor.data)
        })
    }

    async function ucitajGradiliste() {
        await GradilistaService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setGradilista(odgovor.data)
        })
    }


    async function dodaj(nalog) {
        await NalogService.dodaj(nalog).then(() => {
            navigate(RouteNames.NALOZI)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

        // // --- KONTROLA 1: Ime (Postojanje) ---
        // if (!podaci.get('ime') || podaci.get('ime').trim().length === 0) {
        //     alert("Ime je obavezno i ne smije sadržavati samo razmake!");
        //     return;
        // }

        // // --- KONTROLA 2: Ime (Minimalna duljina) ---
        // if (podaci.get('ime').trim().length < 2) {
        //     alert("Ime mora imati najmanje 2 znaka!");
        //     return;
        // }

        // // --- KONTROLA 3: Prezime (Postojanje) ---
        // if (!podaci.get('prezime') || podaci.get('prezime').trim().length === 0) {
        //     alert("Prezime je obavezno i ne smije sadržavati samo razmake!");
        //     return;
        // }

        // // --- KONTROLA 4: Prezime (Minimalna duljina) ---
        // if (podaci.get('prezime').trim().length < 2) {
        //     alert("Prezime mora imati najmanje 2 znaka!");
        //     return;
        // }

        // // --- KONTROLA 5: Email (Postojanje) ---
        // if (!podaci.get('email') || podaci.get('email').trim().length === 0) {
        //     alert("Email je obavezan!");
        //     return;
        // }

        // // --- KONTROLA 6: Email (Format) ---
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(podaci.get('email'))) {
        //     alert("Email nije u ispravnom formatu!");
        //     return;
        // }

        // // --- KONTROLA 7: OIB (Postojanje) ---
        // if (!podaci.get('oib') || podaci.get('oib').trim().length === 0) {
        //     alert("OIB je obavezan!");
        //     return;
        // }

        // // --- KONTROLA 8: OIB (Duljina) ---
        // if (podaci.get('oib').trim().length !== 11) {
        //     alert("OIB mora imati točno 11 znamenki!");
        //     return;
        // }

        // // --- KONTROLA 9: OIB (Samo brojevi) ---
        // if (!/^\d+$/.test(podaci.get('oib'))) {
        //     alert("OIB smije sadržavati samo brojeve!");
        //     return;
        // }

        dodaj({sifra:podaci.get('sifra'),
            sifraPoduzece: podaci.get('sifraPoduzeca'),
            sifraGradilista: podaci.get('sifraGradilista'),
            datumIzdavanja: podaci.get('datumIzdavanja'),
            datumZavrsetka: podaci.get('datumZavrsetka'),
            ukupniIznos: podaci.get('ukupniIznos'),
            
        })
    }
            
    return (
        <>
            <h3>Unos novog naloga</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="poduzece" className="mb-3">
                    <Form.Label className="fw-bold">Poduzeće</Form.Label>
                    <Form.Select name="poduzece" required>
                        <option value="">Odaberite poduzeće</option>
                        {poduzeca && poduzeca.map((poduzece) => (
                            <option key={poduzece.sifra} value={poduzece.sifra}>
                                {poduzece.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                    <Form.Group controlId="gradiliste" className="mb-3">
                    <Form.Label className="fw-bold">Gradilište</Form.Label>
                    <Form.Select name="gradiliste" required>
                        <option value="">Odaberite gradilište</option>
                        {gradilista && gradilista.map((gradiliste) => (
                            <option key={gradiliste.sifra} value={gradiliste.sifra}>
                                {gradiliste.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>




                <Form.Group controlId="datumIzdavanja" className="mb-3">
                    <Form.Label className="fw-bold">Datum izdavanja</Form.Label>
                    <Form.Control type="date" name="datumIzdavanja" required />
                </Form.Group>
                <Form.Group controlId="datumZavrsetka" className="mb-3">
                    <Form.Label className="fw-bold">Datum završetka</Form.Label>
                    <Form.Control type="date" name="datumZavrsetka" required />
                </Form.Group>
                <Form.Group controlId="ukupniIznos" className="mb-3">
                    <Form.Label className="fw-bold">Ukupni iznos</Form.Label>
                    <Form.Control type="number" name="ukupniIznos" required min="0" step="0.01" />
                </Form.Group>



                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.NALOG} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novi nalog
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
