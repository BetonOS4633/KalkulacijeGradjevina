import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import RadnikService from "../../services/poduzece/PoduzeceService"

export default function PoduzeceNovi(){

    const navigate = useNavigate()

    async function dodaj(poduzece){
        await RadnikService.dodaj(poduzece).then(()=>{
            navigate(RouteNames.PODUZECE)
        })
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault() // nemoj odraditi submit
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

         // --- KONTROLA 3: Prezime (Postojanje) ---
         if (!podaci.get('adresa') || podaci.get('adresa').trim().length === 0) {
             alert("Adresa je obavezna i ne smije sadržavati samo razmake!");
            return;
        }

         // --- KONTROLA 4: Prezime (Minimalna duljina) ---
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

        dodaj({
            naziv: podaci.get('ime'),
            adresa: podaci.get('prezime'),
            mjesto: podaci.get('mjesto'),
            email: podaci.get('email'),
            telefon: podaci.get('telefon'),
            oib: podaci.get('oib')
        })
    }

    return (
        <>
            <h3>Unos novog poduzeća</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" name="adresa" required />
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control type="text" name="mjesto" required />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" required />
                </Form.Group>

                <Form.Group controlId="telefon">
                    <Form.Label>Telefon</Form.Label>
                    <Form.Control type="text" name="telefon" required />
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required maxLength={11} />
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.RADNICI} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Dodaj novo poduzeće
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
