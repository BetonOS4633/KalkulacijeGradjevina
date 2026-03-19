import { useEffect, useState } from "react"
import StrojService from "../../services/Strojevi/StrojService"

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
    <> <Table>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Trajanje</th>
                    <th>Cijena</th>
                    <th>Datum pokretanja</th>
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


