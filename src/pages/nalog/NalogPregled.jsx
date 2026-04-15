import { useEffect, useState } from "react"
import NalogService from "../../services/nalog/NalogService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function NalogPregled() {

    const navigate = useNavigate()

    const [nalozi, setNalozi] = useState([])

    useEffect(() => {
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

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await NalogService.obrisi(sifra);
        await NalogService.get().then((odgovor) => {
            setNalozi(odgovor.data)
        })
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

                    </tr>
                </thead>
                <tbody>
                    {nalozi && nalozi.map((nalog) => (
                        <tr key={nalog.sifra}>
                            <td>nalog.sifraPoduzeca</td>
                            <td>nalog.sifraGradilista</td>

                            <td>
                                <FormatDatum datum={nalog.datumPokretanja} />
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
