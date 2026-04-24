
import { useEffect, useState } from "react"
import NalogService from "../../services/nalog/NalogService"
import PoduzeceService from "../../services/poduzece/PoduzeceService"
import GradilisteService from "../../services/gradiliste/GradilistaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import FormatDatum from "../../components/Formatdatum"
import { NumericFormat } from "react-number-format"

// 📌 Uvoz ikona iz react-icons
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"

export default function NalogPregled() {

    const navigate = useNavigate()

    const [poduzeca, setPoduzeca] = useState([])
    const [gradilista, setGradilista] = useState([])
    const [nalozi, setNalozi] = useState([])

    useEffect(() => {
        ucitajGradiliste()
        ucitajPoduzeca()
        ucitajNaloge()
    }, [])

    async function ucitajNaloge() {
        await NalogService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setNalozi(odgovor.data)
        })
    }

    async function ucitajPoduzeca() {
        await PoduzeceService.get().then((odgovor) => {
            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setPoduzeca(odgovor.data)
        })
    }

    async function ucitajGradiliste() {
            await GradilisteService.get().then((odgovor)=>{
                if(!odgovor.success){
                    alert('Nije implementiran servis')
                    return
                }
                setGradilista(odgovor.data)
            })
        }


    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await NalogService.obrisi(sifra);
       
        await NalogService.get().then((odgovor) => {
            setNalozi(odgovor.data)
        })
    }

    function dohvatiNazivPoduzeca(sifraPoduzeca) {
        const poduzece = poduzeca.find(p => p.sifra === sifraPoduzeca)
        return poduzece ? poduzece.naziv : 'N/A'
    }

    function dohvatiNazivGradilista(sifraGradilista) {
        const gradiliste = gradilista.find(p => p.sifra === sifraGradilista)
        return gradiliste ? gradiliste.naziv : 'N/A'
    }

    return (
        <>
            <Link to={RouteNames.NALOG_NOVI}
                className="btn btn-success w-100 my-3">
                Dodavanje novog naloga
            </Link>
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Nalog broj</th>
                        <th>Poduzece</th>
                        <th>Gradiliste</th>
                        <th>Ukupni iznos</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {nalozi && nalozi.map((nalog) => (
                        <tr key={nalog.sifra}>
                            <td className ='lead'>{nalog.sifra}</td>
                            <td>{dohvatiNazivPoduzeca(nalog.sifraPoduzeca)}</td>
                            <td>{dohvatiNazivGradilista(nalog.sifraGradilista)}</td>
                            <td><NumericFormat
                                value={nalog.ukupniIznos}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                suffix={'€'}
                                decimalScale={2}
                                fixedDecimalScale />
                            </td>


                            <td className="text-center">
                                {/* ✏️ Ikona za promjenu */}
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    className="me-2"
                                    title="Promjeni"
                                    onClick={() => { navigate(`/nalog/${nalog.sifra}`) }}
                                >
                                    <FaEdit />
                                </Button>
                                
                                {/* 👁️ Ikona za pregled naloga */}
                                <Button 
                                    variant="outline-info" 
                                    size="sm" 
                                    className="me-2"
                                    title="Pregled naloga"
                                    onClick={() => { navigate(`/nalog/${nalog.sifra}/stavke`) }}
                                >
                                    <FaEye />
                                </Button>

                                {/* 🗑️ Ikona za brisanje */}
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    title="Obriši"
                                    onClick={() => brisanje(nalog.sifra)}
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
