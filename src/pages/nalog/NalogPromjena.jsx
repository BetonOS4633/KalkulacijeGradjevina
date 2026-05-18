


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
    const [nalog, setNalog] = useState({
        sifraPoduzeca: '',
        sifraGradilista: '',
        ukupniIznos: 0
    })
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
            setNalog(n)
        })
    }

    async function promjeni(nalogZaSlanje) {
        await NalogService.promjeni(params.sifra, nalogZaSlanje).then(() => {
            navigate(RouteNames.NALOG)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // ISPRAVLJENO: sifraPoduzeca i sifraGradilista moraju točno odgovarati ključevima koje backend i state očekuju
        promjeni({
            ...nalog, // Čuvamo sve ostale podatke iz naloga (poput šifre)
            sifraPoduzeca: parseInt(podaci.get('poduzece')),
            sifraGradilista: parseInt(podaci.get('gradiliste')),
            ukupniIznos: parseFloat(podaci.get('cijena'))
        })
    }

    return (
        <>
            <h3>Promjena naloga</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="poduzece" className="mb-3">
                    <Form.Label className="fw-bold">Poduzeće</Form.Label>
                    <Form.Select 
                        name="poduzece" 
                        required 
                        value={nalog.sifraPoduzeca || ''} 
                        onChange={(e) => setNalog({ ...nalog, sifraPoduzeca: parseInt(e.target.value) || '' })}
                    >
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
                    <Form.Select 
                        name="gradiliste" 
                        required 
                        value={nalog.sifraGradilista || ''} 
                        onChange={(e) => setNalog({ ...nalog, sifraGradilista: parseInt(e.target.value) || '' })}
                    >
                        <option value="">Odaberite gradilište</option>
                        {gradilista && gradilista.map((gradiliste) => (
                            <option key={gradiliste.sifra} value={gradiliste.sifra}>
                                {gradiliste.naziv}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="cijena" className="mb-3">
                    <Form.Label className="fw-bold">Cijena</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="cijena" 
                        step={0.01}
                        value={nalog.ukupniIznos || ''} 
                        onChange={(e) => setNalog({ ...nalog, ukupniIznos: e.target.value })}
                    />
                </Form.Group>

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
