import { useEffect, useState } from "react"
import StrojService from "../../services/strojevi/StrojService"
import { Table } from "react-bootstrap"
import { NumericFormat } from "react-number-format"
import { GrValidate } from "react-icons/gr"
import FormatDatum from "../../components/Formatdatum"
import { Link } from "react-router-dom"
import { RouteNames } from "../../constants"

export default function StrojPregled() {

    const[strojevi, setStrojevi]=useState([])
    useEffect(()=>{
        ucitajStrojevi()
    },[])
    async function ucitajStrojevi() {
        await StrojService.get().then((odgovor) => {
            setStrojevi(odgovor.data)
        });
    }

    
    return (
        <>
    <Link to={RouteNames.STROJEVI_NOVI} 
        className="btn btn-success w-100 mb-3 mt-3">
        Dodavanje novog smjera
        
    </Link>
    
    
    
     <Table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Trajanje</th>
                    <th>Cijena radnog sata u €</th>
                    <th>Vrijeme početka</th>
                    <th>Vrijeme završetka</th>
                    <th>Aktiv</th>
                    <th>Akcija</th>

                </tr>
            </thead>
            <tbody>
                {strojevi && strojevi.map((stroj)=>(
                    <tr>
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
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </Table>

    </> 
    )
}


