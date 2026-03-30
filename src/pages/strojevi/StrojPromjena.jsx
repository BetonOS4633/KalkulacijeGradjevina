import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import StrojService from "../../services/strojevi/StrojService";
import { useEffect, useState } from "react";

export default function StrojNovi(){
   
    const navigate=useNavigate()
    const params = useParams()
    const [stroj,setStroj] = useState({})
    const [aktivan,setAktivan] = useState(false)

   async function ucitajStroj() {
        await StrojService.getBySifra(params.sifra).then((odgovor)=>{
            
            const s = odgovor.data
            // po potrebi prilagođavam podatke
            console.log(s)
            s.datumPokretanja = s.datumPokretanja.substring(0,19)
            s.datumKraja = s.datumKraja.substring(0,19)
            setStroj(s)

            setAktivan(s.aktivan)
        })
    }

    useEffect(()=>{
        ucitajStroj()
    },[])

    async function promjeni(stroj){
        await StrojService.promjeni(params.sifra,stroj).then(()=>{
            navigate(RouteNames.STROJEVI)
        })
    }



    function odradiSubmit(e){   //e je event
        e.preventDefault();     // nemoj odraditi submint
        const podaci = new FormData(e.target);
        promjeni({
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
                <Form.Control type="text" name="naziv" required defaultValue={stroj.naziv}/>
            </Form.Group>

            <Form.Group controlId="trajanje">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" name="trajanje" step ={1} defaultValue={stroj.trajanje} />
            </Form.Group>

            <Form.Group controlId="cijena">
                <Form.Label>Cijena</Form.Label>
                <Form.Control type="number" name="cijena" step={0.01}
                defaultValue={stroj.cijena}/>
            </Form.Group>

            <Form.Group controlId="datumPokretanja">
                <Form.Label>Datum i vrijeme pokretanja stroja</Form.Label>
                <Form.Control type="datetime-local" name="datumPokretanja"
                defaultValue={stroj.datumPokretanja} />
            </Form.Group>

            <Form.Group controlId="datumKraja">
                <Form.Label>Datum i vrijeme završetka rada stroja</Form.Label>
                <Form.Control type="datetime-local" name="datumKraja" 
                defaultValue={stroj.datumKraja} />
            </Form.Group>


            <Form.Group controlId="aktivan">
                <Form.Check label="Aktivan" name="aktivan"
                checked={aktivan}
                onChange={(e)=>{setAktivan(e.target.checked)}}            
                />
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
                    Promjeni stroj
                   </Button>
                </Col>

            </Row>

        </Form>
        </>
    )
}