import { useEffect, useState } from "react"
import NalogService from "../../services/nalog/NalogService"
import PoduzeceService from "../../services/poduzece/PoduzeceService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import FormatDatum from "../../components/Formatdatum"
import { NumericFormat } from "react-number-format"

export default function NalogPregled() {

    const navigate = useNavigate()

    const [poduzeca, setPoduzeca] = useState([])
    const [nalozi, setNalozi] = useState([])

    useEffect(() => {
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


    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await NalogService.obrisi(sifra);
        await NalogService.get().then((odgovor) => {
            setNalozi(odgovor.data)
        })
    }

    function dohvatiPoduzeca(sifraPoduzeca) {
        const poduzece = poduzeca.find(p => p.sifra === sifraPoduzeca)
        return poduzece ? poduzece.naziv : 'N/A'
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
                        <th>datum pocetka</th>
                        <th>datum kraja</th>
                        <th>Ukupni iznos</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {nalozi && nalozi.map((nalog) => (
                        <tr key={nalog.sifra}>
                            <td className ='lead'>{nalog.sifra}</td>
                            <td>{dohvatiPoduzeca(nalog.sifraPoduzeca)}</td>
                            <td>{nalog.sifraGradilista}</td>

                            <td>
                                <FormatDatum datum={nalog.datumIzdavanja} />
                            </td>

                            <td>
                                <FormatDatum datum={nalog.datumZavrsetka} />
                            </td>

                            <td><NumericFormat
                                value={nalog.ukupniIznos}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                suffix={'€'}
                                decimalScale={2}
                                fixedDecimalScale />
                            </td>


                            <td>
                                <Button onClick={() => { navigate(`/nalog/${nalog.sifra}`) }}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button variant="danger" onClick={() => brisanje(nalog.sifra)}>
                                    Obriši
                                </Button>
                                <Button onClick={() => { navigate(`/nalog/${nalog.sifra}`) }}>
                                    Pregled naloga
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
