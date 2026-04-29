import { useEffect, useState } from "react"
import StrojService from "../../services/strojevi/StrojService"
import { Button, Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { GrValidate } from "react-icons/gr"
import FormatDatum from "../../components/Formatdatum"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function StrojPregled() {

    const navigate = useNavigate()
    const[strojevi, setStrojevi]=useState([])

    useEffect(()=>{
        ucitajStrojevi()
    },[])
    async function ucitajStrojevi() {
        await StrojService.get().then((odgovor) => {
            setStrojevi(odgovor.data)
        });
    }

     async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        
        await StrojService.obrisi(sifra);
        ucitajStrojevi()
    }

    
    return (
        <>
    <Link to={RouteNames.STROJEVI_NOVI} 
        className="btn btn-success w-100 mb-3 mt-3">
        Dodavanje novog stroja
        
    </Link>
    
    
    
     <Table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Trajanje</th>
                    <th>Cijena radnog sata u €</th>
                    <th>Datum i vrijeme kupnje</th>
                    <th>Datum i vrijeme sledećeg servisa</th>
                    <th>Aktiv</th>
                    <th>Akcija</th>

                </tr>
            </thead>
            <tbody>
                {strojevi && strojevi.map((stroj)=>(
                    <tr key={stroj.sifra}>
                        <td>{stroj.naziv}</td>
                        <td>{stroj.trajanje}</td>
                       
                        <td><NumericFormat
                            value={stroj.cijena}
                            displayType={'text'}
                            thousandSeparator='.'
                            decimalSeparator=','
                            suffix={'€'}
                            decimalScale={2}
                            fixedDecimalScale
                        />
                        </td>
                    
                        <td>
                            <FormatDatum datum={stroj.datumPokretanja}/>


                        </td>
                        <td>
                            <FormatDatum datum={stroj.datumKraja}/>
                        </td>

                        <td>
                            <GrValidate
                                size={25}
                                color={stroj.aktivan?'green':'red'}
                                />
                            
                            </td>
                        <td>
                            <Button onClick={()=>{navigate(`/strojevi/${stroj.sifra}`)}
                                }>
                                    Promjena
                            </Button>
                            &nbsp;&nbsp;
                            <Button variant="danger" onClick={()=>{brisanje(stroj.sifra)}
                                }>
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


