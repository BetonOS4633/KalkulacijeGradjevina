
import { useEffect, useState } from "react"
import RadnikService from "../../services/radnici/RadnikService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
// Uvoz ikona (Font Awesome set)
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"

export default function RadnikPregled(){

    const navigate = useNavigate()
    const [radnici, setRadnici] = useState([])

    useEffect(()=>{
        ucitajRadnike()
    },[])

    async function ucitajRadnike() {
        const odgovor = await RadnikService.get();
        if(!odgovor.success){
            alert('Nije implementiran servis');
            return;
        }
        setRadnici(odgovor.data);
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await RadnikService.obrisi(sifra);
        ucitajRadnike(); // Osvježi listu pozivom postojeće funkcije
    }

    return(
        <>
        <Link to={RouteNames.RADNICI_NOVI}
        className="btn btn-success w-100 my-3">
            <FaPlus /> Dodavanje novog radnika
        </Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Email</th>
                    <th>OIB</th>
                    <th className="text-center">Akcije</th>
                </tr>
            </thead>
            <tbody>
                {radnici && radnici.map((radnik)=>(
                    <tr key={radnik.sifra}>
                        <td className="lead">{radnik.ime}</td>
                        <td className="lead">{radnik.prezime}</td>
                        <td>{radnik.email}</td>
                        <td>{radnik.oib}</td>
                        <td className="text-center">
                            <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/radnici/${radnik.sifra}`)}}
                                title="Promjeni"
                            >
                                <FaEdit />
                            </Button>
                            &nbsp;&nbsp;
                            <Button 
                                variant="danger" 
                                onClick={() => brisanje(radnik.sifra)}
                                title="Obriši"
                            >
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
