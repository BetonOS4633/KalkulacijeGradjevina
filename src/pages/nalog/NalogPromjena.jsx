import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import NalogService from "../../services/nalog/NalogService"
import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"

export default function NalogPromjena(){

    const navigate = useNavigate()
    const params = useParams()
    const [nalozi, setNalog] = useState({})

    useEffect(()=>{
        ucitajNalog()
    },[])

    async function ucitajNalog() {
        await NalogService.getBySifra(params.sifra).then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setNalog(odgovor.data)
        })
    }

    async function promjeni(nalog) {
        await NalogService.promjeni(params.sifra,nalog).then(()=>{
            navigate(RouteNames.NALOG)
        })
    }

    function odradiSubmit(e){
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

    return(
         <>
            <h3>Promjena polaznika</h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="sifraPoduzeca">
                    <Form.Label>Poduzeće</Form.Label>
                    <Form.Control type="text" name="sifraPoduzeca" required 
                    defaultValue={nalozi.sifraPoduzeca}/>
                </Form.Group>

                <Form.Group controlId="sifraGradilista">
                    <Form.Label>Gradilište</Form.Label>
                    <Form.Control type="text" name="sifraGradilista" required 
                    defaultValue={nalozi.sifraGradilista}/>
                </Form.Group>


<Form.Group controlId="datumPokretanja">
                <Form.Label>Datum i vrijeme početka rada </Form.Label>
                <Form.Control type="datetime-local" name="datumPokretanja"
                defaultValue={nalozi.datumIzdavanja} />
            </Form.Group>

            <Form.Group controlId="datumKraja">
                <Form.Label>Datum i vrijeme završetka rada</Form.Label>
                <Form.Control type="datetime-local" name="datumKraja" 
                defaultValue={nalozi.datumZavrsetka} />
            </Form.Group>







 <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01}
                defaultValue={nalozi.ukupniIznos}/>
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
