
import { useEffect, useState } from "react"
import StrojService from "../../services/strojevi/StrojService"
import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
// Uvoz potrebnih ikona (dodane FaCheck i FaMinus)
import { FaEdit, FaTrash, FaPlus, FaCheck, FaMinus } from "react-icons/fa"
import FormatDatum from "../../components/Formatdatum"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function StrojPregled() {

    const navigate = useNavigate()
    const [strojevi, setStrojevi] = useState([])

    useEffect(() => {
        ucitajStrojevi()
    }, [])

    async function ucitajStrojevi() {
        const odgovor = await StrojService.get();
        if (odgovor.success) {
            setStrojevi(odgovor.data);
        }
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await StrojService.obrisi(sifra);
        ucitajStrojevi();
    }

    return (
        <>
            <Link to={RouteNames.STROJEVI_NOVI}
                className="btn btn-success w-100 mb-3 mt-3">
                <FaPlus /> Dodavanje novog stroja
            </Link>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Trajanje</th>
                        <th>Cijena / h</th>
                        <th>Datum kupnje</th>
                        <th>Sljedeći servis</th>
                        <th className="text-center">Aktiv</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {strojevi && strojevi.map((stroj) => (
                        <tr key={stroj.sifra}>
                            <td>{stroj.naziv}</td>
                            <td>{stroj.trajanje}</td>
                            <td>
                                <NumericFormat
                                    value={stroj.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    suffix={' €'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                />
                            </td>
                            <td>
                                <FormatDatum datum={stroj.datumPokretanja} />
                            </td>
                            <td>
                                <FormatDatum datum={stroj.datumKraja} />
                            </td>
                            <td className="text-center">
                                {/* Logika za kvačicu (zeleno) ili minus (crveno) */}
                                {stroj.aktivan ? (
                                    <FaCheck color="green" size={20} title="Aktivan" />
                                ) : (
                                    <FaMinus color="red" size={20} title="Neaktivan" />
                                )}
                            </td>
                            <td className="text-center">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => { navigate(`/strojevi/${stroj.sifra}`) }}
                                    title="Promijeni"
                                >
                                    <FaEdit />
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => { brisanje(stroj.sifra) }}
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
