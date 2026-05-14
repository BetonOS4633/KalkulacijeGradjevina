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
            navigate(RouteNames.NALOG)
        })
    }

    function odradiSubmit(e) { // e je event
        e.preventDefault() // nemoj odraditi submit
        const podaci = new FormData(e.target)

     
        dodaj({
            sifra: podaci.get('sifra'),
            sifraPoduzeca: parseInt(podaci.get('poduzece')),
            sifraGradilista: parseInt(podaci.get('gradiliste')),
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