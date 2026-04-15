import { useEffect, useState } from "react"
import RadnikService from "../../services/radnici/RadnikService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function NalogPregled(){

    const navigate = useNavigate()

    const [radnici, setRadnici] = useState([])

    useEffect(()=>{
        ucitajRadnike()
    },[])

    async function ucitajRadnike() {
        await RadnikService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setRadnici(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await RadnikService.obrisi(sifra);
        await RadnikService.get().then((odgovor)=>{
            setRadnici(odgovor.data)
        })
    }

    return(
        <>
        <Link to={RouteNames.RADNICI_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog radnika
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Email</th>
                    <th>OIB</th>
                    <th>Akcije</th>
                    
                </tr>
            </thead>
            <tbody>
                {radnici && radnici.map((radnik)=>(
                    <tr key={radnik.sifra}>
                        <td className="lead">{radnik.ime}</td>
                        <td className="lead">{radnik.prezime}</td>
                        <td>{radnik.email}</td>
                        <td>{radnik.oib}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/radnici/${radnik.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(radnik.sifra)}>
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
