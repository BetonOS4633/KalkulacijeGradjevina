import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import NalogService from "../../services/nalog/NalogService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import GradilistaService from "../../services/gradiliste/GradilistaService"
import PoduzeceService from "../../services/poduzece/PoduzeceService"

export default function NalogPromjena() {

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

        promjeni({
            sifraPoduzece: podaci.get('sifraPoduzeca'),
            sifraGradilista: podaci.get('sifraGradilista'),
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
