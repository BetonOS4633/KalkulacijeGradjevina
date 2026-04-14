import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import poduzeceService from "../../services/poduzece/PoduzeceService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function PoduzecePromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [poduzece, setPoduzece] = useState({})

    useEffect(()=>{
        ucitajPoduzece()
    },[])

    async function ucitajPoduzece() {
        await poduzeceService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setPoduzece(odgovor.data)
        })
    }

    async function promjeni(poduzece) {
        await poduzeceService.promjeni(params.sifra,poduzece).then(()=>{
            navigate(RouteNames.PODUZECE)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)

         // --- KONTROLA 1: Ime (Postojanje) ---
         if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
             alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
             return;
         }

         // --- KONTROLA 2: Ime (Minimalna duljina) ---
         if (podaci.get('naziv').trim().length < 2) {
             alert("Naziv mora imati najmanje 2 znaka!");
             return;
         }

         // --- KONTROLA 3: Adresa (Postojanje) ---
         if (!podaci.get('adresa') || podaci.get('adresa').trim().length === 0) {
             alert("Adresa je obavezna i ne smije sadržavati samo razmake!");
             return;
         }

         // --- KONTROLA 4: Adresa (Minimalna duljina) ---
         if (podaci.get('adresa').trim().length < 2) {
             alert("Adresa mora imati najmanje 2 znaka!");
             return;
         }

        // --- KONTROLA 5: Email (Postojanje) ---
        if (!podaci.get('email') || podaci.get('email').trim().length === 0) {
            alert("Email je obavezan!");
            return;
        }

        // --- KONTROLA 6: Email (Format) ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(podaci.get('email'))) {
            alert("Email nije u ispravnom formatu!");
            return;
        }

        // --- KONTROLA 7: OIB (Postojanje) ---
        if (!podaci.get('oib') || podaci.get('oib').trim().length === 0) {
            alert("OIB je obavezan!");
            return;
        }

        // --- KONTROLA 8: OIB (Duljina) ---
        if (podaci.get('oib').trim().length !== 11) {
            alert("OIB mora imati točno 11 znamenki!");
            return;
        }

        // --- KONTROLA 9: OIB (Samo brojevi) ---
        if (!/^\d+$/.test(podaci.get('oib'))) {
            alert("OIB smije sadržavati samo brojeve!");
            return;
        }

        promjeni({
            naziv: podaci.get('naziv'),
            adresa: podaci.get('adresa'),
            mjesto: podaci.get('mjesto'),
            email: podaci.get('email'),
            telefon: podaci.get('telefon'),
            oib: podaci.get('oib')
        })
    }

    return(
         <>
            <h3>Promjena poduzeća</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={poduzece.naziv}/>
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" name="adresa" required 
                    defaultValue={poduzece.adresa}/>
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control type="text" name="mjesto" required 
                    defaultValue={poduzece.mjesto}/>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required 
                    defaultValue={poduzece.email}/>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required maxLength={11}
                    defaultValue={poduzece.oib}/>
                </Form.Group>

                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control type="text" name="telefon" required 
                    defaultValue={poduzece.telefon}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.PODUZECE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni poduzeće
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
