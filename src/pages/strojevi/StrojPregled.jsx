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
    <>
    Ovdje će se vidjeti strojevi
   <ul>
    {strojevi && strojevi.map((stroj) =>
         (<li> {stroj.naziv}</li>
         ))}
   </ul>    

    </> 
    )
}


