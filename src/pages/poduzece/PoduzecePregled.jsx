import { useEffect, useState } from "react"
import PoduzeceService from "../../services/poduzece/PoduzeceService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function PoduzecePregled(){

    const navigate = useNavigate()

    const [poduzeca, setPoduzeca] = useState([])

    useEffect(()=>{
        ucitajPoduzece()
    },[])

    async function ucitajPoduzece() {
        await PoduzeceService.get().then((odgovor)=>{
            if(!odgovor.success){
                alert('Nije implementiran servis')
                return
            }
            setPoduzeca(odgovor.data)
        })
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await PoduzeceService.obrisi(sifra);
        await PoduzeceService.get().then((odgovor)=>{
            setPoduzeca(odgovor.data)
        })
    }

    return(
        <>
        <Link to={RouteNames.PODUZECE_NOVI}
        className="btn btn-success w-100 my-3">
            Dodavanje novog poduzeća
        </Link>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Adresa</th>
                    <th>Mjesto</th>
                    <th>Email</th>
                    <th>Telefon</th>
                    <th>OIB</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {poduzeca && poduzeca.map((poduzece)=>(
                    <tr key={poduzece.sifra}>
                        <td className="lead">{poduzece.naziv}</td>
                        <td className="lead">{poduzece.adresa}</td>
                        <td>{poduzece.mjesto}</td>
                        <td>{poduzece.email}</td>
                        <td>{poduzece.telefon}</td>
                        <td>{poduzece.oib}</td>
                        <td>
                            <Button onClick={()=>{navigate(`/poduzece/${poduzece.sifra}`)}}>
                                Promjeni
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={() => brisanje(poduzece.sifra)}>
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
