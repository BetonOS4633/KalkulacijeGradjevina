import { useEffect, useState } from "react"
import GradilistaService from "../../services/gradiliste/GradilistaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function GradilistePregled(){

    const navigate = useNavigate()

    const [gradiliste, setGradiliste] = useState([])

    useEffect(()=>{
        ucitajGradiliste()
    },[])

    async function ucitajGradiliste() {
        await GradilistaService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setGradiliste(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await GradilisteService.obrisi(sifra);
        await GradilisteService.get().then((odgovor)=>{
            setGradiliste(odgovor.data)
        })
    }

    return(
        <>
        <Link to={RouteNames.GRADILISTE_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog gradilista
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Adresa</th>
                    <th>Mjesto</th>
                    <th>OIB</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {gradiliste && gradiliste.map((gradiliste)=>(
                    <tr key={gradiliste.sifra}>
                        <td className="lead">{gradiliste.naziv}</td>
                        <td className="lead">{gradiliste.adresa}</td>
                        <td>{gradiliste.mjesto}</td>
                        <td>{gradiliste.oib}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/gradiliste/${gradiliste.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(gradiliste.sifra)}>
                                Obriši
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
