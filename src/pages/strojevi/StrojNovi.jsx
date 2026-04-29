import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import StrojStrojevi from "../../services/strojevi/StrojService";

export default function StrojNovi(){
    const navigate=useNavigate()

    async function dodaj(stroj){
        //console.table(smjer)  //ovo je za kontrolu

        await StrojStrojevi.dodaj(stroj).then(()=>{
            navigate(RouteNames.STROJEVI)})
    }



    function odradiSubmit(e){   //e je event
        e.preventDefault();     // nemoj odraditi submint
        const podaci = new FormData(e.target);
        dodaj({
            naziv: podaci.get('naziv'),
            trajanje: parseInt(podaci.get('trajanje')),
            cijena: parseFloat(podaci.get('cijena')),
            datumPokretanja:new Date(podaci.get('datumPokretanja')).toISOString(),
            datumKraja:new Date(podaci.get('datumKraja')).toISOString(),
            aktivan: podaci.get('aktivan')==='on'
        })
    }


    return(
        <>
        <h3>
            Unos novog stroja
        </h3>
        <Form onSubmit={odradiSubmit}>
            <Form.Group controlId="naziv">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" name="naziv" required />
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>
                     Trajanje
                </Form.Label>
                <Form.Control type="number" name="trajanje" step ={1} />
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="datumPokretanja">
                <Form.Label>Datum i vrijeme kupnje stroja</Form.Label>
                <Form.Control type="datetime-local" name="datumPokretanja" />
            </Form.Group>

            <Form.Group controlId="datumKraja">
                <Form.Label>Datum i vrijeme sledećeg servisa</Form.Label>
                <Form.Control type="datetime-local" name="datumKraja" />
            </Form.Group>


            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan"/>
            </Form.Group>

            <hr style={{marginTop: '50px', border:'0'}}/>

            <Row>
                <Col>
                    <Link to={RouteNames.STROJEVI} className="btn btn-danger">
                    Odustani
                    </Link>
  
                </Col>

                <Col>
                   <Button type="submit" variant="success">
                    Dodaj novi stroj
                   </Button>
                </Col>

            </Row>

        </Form>
        </>
    )
}