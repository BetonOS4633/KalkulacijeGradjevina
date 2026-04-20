import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import NalogService from "../../services/nalog/NalogService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import GradilistaService from "../../services/gradiliste/GradilistaService"
import PoduzeceService from "../../services/poduzece/PoduzeceService"

export default function StavkaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [nalog, setNalog] = useState({})
    const [poduzeca, setPoduzeca] = useState([])
    const [gradilista, setGradilista] = useState([])

    useEffect(() => {
        ucitajGradiliste()
        ucitajPoduzeca()
        ucitajNalog()
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

    async function ucitajNalog() {
        await NalogService.getBySifra(params.sifra).then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            const n = odgovor.data
            
           // n.datumIzdavanja = n.datumIzdavanja.substring(0,10)
           // n.datumZavrsetka = n.datumZavrsetka.substring(0,10)
           // console.table(n)
            setNalog(n)
        })
    }

    async function promjeni(nalog) {
        await NalogService.promjeni(params.sifra, nalog).then(() => {
            navigate(RouteNames.NALOG)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // // --- KONTROLA 1: Ime (Postojanje) ---
        // if (!podaci.get('sifraPoduzeca') || podaci.get('sifraPoduzeca.trim().length === 0) {
        //     alert("Ime je obavezno i ne smije sadržavati samo razmake!");
        //     return;
        // }

        // // --- KONTROLA 2: Ime (Minimalna duljina) ---
        // if (podaci.get('sifraPoduzeca').trim().length < 2) {
        //     alert("Sifra poduzeca mora imati najmanje 2 znaka!");
        //     return;
        // }

        // // --- KONTROLA 3: Prezime (Postojanje) ---
        // if (!podaci.get('sifraGradilista') || podaci.get('sifraGradilista').trim().length === 0) {
        //     alert("Gradiliste je obavezno i ne smije sadržavati samo razmake!");
        //     return;
        // }

        // // --- KONTROLA 4: Prezime (Minimalna duljina) ---
        // if (podaci.get('sifraGradilista').trim().length < 2) {
        //     alert("Gradiliste mora imati najmanje 2 znaka!");
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

        // // // --- KONTROLA 7: OIB (Postojanje) ---
        // // if (!podaci.get('oib') || podaci.get('oib').trim().length === 0) {
        // //     alert("OIB je obavezan!");
        // //     return;
        // // }

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

        promjeni({
            sifraPoduzece: podaci.get('sifraPoduzeca'),
            sifraGradilista: podaci.get('sifraGradilista'),
            datumIzdavanja: podaci.get('datumIzdavanja'),
            datumZavrsetka: podaci.get('datumZavrsetka'),
            ukupniIznos: podaci.get('ukupniIznos'),


            // email: podaci.get('email'),
            // oib: podaci.get('oib')
        })
    }

    return (
        <>
            <h3>Promjena polaznika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="poduzece" className="mb-3">
                    <Form.Label className="fw-bold">Poduzeće</Form.Label>
                    <Form.Select name="poduzece" required value={nalog.sifraPoduzeca || ''} onChange={(e) => setNalog({ ...nalog, sifraPoduzeca: parseInt(e.target.value) })}>
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
                    <Form.Select name="gradiliste" required value={nalog.sifraGradilista || ''} onChange={(e) => setNalog({ ...nalog, sifraGradilista: parseInt(e.target.value) })}>
                        <option value="">Odaberite gradilište</option>
                        {gradilista && gradilista.map((gradiliste) => (
                            <option key={gradiliste.sifra} value={gradiliste.sifra}>
                                {gradiliste.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>



                <Form.Group controlId="datumIzdavanja">
                    <Form.Label>Datum i vrijeme početka rada </Form.Label>
                    <Form.Control type="datetime-local" name="datumIzdavanja"
                        defaultValue={nalog.datumIzdavanja} />
                </Form.Group>

                <Form.Group controlId="datumZavrsetka">
                    <Form.Label>Datum i vrijeme završetka rada</Form.Label>
                    <Form.Control type="datetime-local" name="datumZavrsetka"
                        defaultValue={nalog.datumZavrsetka} />
                </Form.Group>







                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01}
                        defaultValue={nalog.ukupniIznos} />
                </Form.Group>
                {/* 
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required 
                    defaultValue={radnik.email}/>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required maxLength={11}
                    defaultValue={radnik.oib}/>
                </Form.Group> */}

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.NALOG} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni nalog
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
