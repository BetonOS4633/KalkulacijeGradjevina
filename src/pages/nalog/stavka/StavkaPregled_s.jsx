import { useEffect, useState } from "react"

import { Button, Table } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../../constants"


export default function StavkaPregled() {

    const navigate = useNavigate()
    const params = useParams()

   
    useEffect(() => {
       console.log(params.sifra)

    }, [])

   

    return (
        <>
           <Link to={RouteNames.NALOG} className="btn btn-danger">
                            Odustani
                        </Link>
                         Podaci o nalogu

        <hr />

            Stavke
            <Table striped bordered hover>
                <thead>
                    <tr>

                        <th>Stavka broj</th>
                        <th>Radnik</th>
                        <th>Stroj</th>
                        <th>Datum/Vrijeme početka</th>
                        <th>Datum/Vrijeme kraja</th>
                        <th>Ukupni iznos</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </Table>
        </>
    )
}
