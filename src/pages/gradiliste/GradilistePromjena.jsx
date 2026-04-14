import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import GradilisteService from "../../services/gradiliste/GradilistaService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function GradilistePromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [gradiliste, setGradiliste] = useState({})

    useEffect(()=>{
        ucitajGradiliste()
    },[])

    async function ucitajGradiliste() {
        await GradilisteService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setGradiliste(odgovor.data)
        })
    }

    async function promjeni(gradiliste) {
        await GradilisteService.promjeni(params.sifra,gradiliste).then(()=>{
            navigate(RouteNames.GRADILISTE)
        })
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)

         // --- KONTROLA 1: Naziv (Postojanje) ---
         if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
             alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
             return;
         }

         // --- KONTROLA 2: Naziv (Minimalna duljina) ---
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
         // --- KONTROLA 5: Mjesto (Postojanje) ---
         if (!podaci.get('mjesto') || podaci.get('mjesto').trim().length === 0) {
             alert("Mjesto je obavezno i ne smije sadržavati samo razmake!");
             return;
         }

         // --- KONTROLA 6: Mjesto (Minimalna duljina) ---
         if (podaci.get('mjesto').trim().length < 2) {
             alert("Mjesto mora imati najmanje 2 znaka!");
             return;
         }




        //  // --- KONTROLA 5: Email (Postojanje) ---
        //  if (!podaci.get('email') || podaci.get('email').trim().length === 0) {
        //      alert("Email je obavezan!");
        //      return;
        //  }

        //  // --- KONTROLA 6: Email (Format) ---
        //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //  if (!emailRegex.test(podaci.get('email'))) {
        //      alert("Email nije u ispravnom formatu!");
        //      return;
        //  }

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
            oib: podaci.get('oib')
        })
    }

    return(
         <>
            <h3>Promjena gradilišta</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={gradiliste.naziv}/>
                </Form.Group>

                <Form.Group controlId="adresa">
                    <Form.Label>Adresa</Form.Label>
                    <Form.Control type="text" name="adresa" required 
                    defaultValue={gradiliste.adresa}/>
                </Form.Group>

                <Form.Group controlId="mjesto">
                    <Form.Label>Mjesto</Form.Label>
                    <Form.Control type="text" name="mjesto" required 
                    defaultValue={gradiliste.mjesto}/>
                </Form.Group>

                <Form.Group controlId="oib">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control type="text" name="oib" required maxLength={11}
                    defaultValue={gradiliste.oib}/>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.GRADILISTE} className="btn btn-danger">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success">
                            Promjeni gradiliste 
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
