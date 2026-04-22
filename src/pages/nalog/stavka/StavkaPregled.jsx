// import { useEffect, useState } from "react"
// import { Button, Table, Alert, Card, Row, Col } from "react-bootstrap"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import { RouteNames } from "../../../constants"
// import StavkaService from "../../../services/stavka/StavkaService"
// import NalogService from "../../../services/nalog/NalogService"
// import PoduzeceService from "../../../services/poduzece/PoduzeceService"
// import GradilisteService from "../../../services/gradiliste/GradilistaService"

// export default function StavkaPregled() {
//     const navigate = useNavigate()
//     const params = useParams()
    
//     const [stavke, setStavke] = useState([])
//     const [nalog, setNalog] = useState({})
//     const [poduzece, setPoduzece] = useState({})
//     const [gradiliste, setGradiliste] = useState({})
  

//     useEffect(() => {
//         dohvatiSvePodatke()
//     }, [params.sifra])

//     const ukupniIznos = stavke.reduce((acc, s) => acc + Number(s.iznos || 0), 0);
  

//     async function dohvatiSvePodatke() {

//         // Dohvat naloga za zaglavlje
//         const odgovor = await StavkaService.get(params.sifra)
//         if (odgovor.success) {
//             setStavke(odgovor.data)
//         }

//         const nalogOdgovor = await NalogService.getBySifra(params.sifra)
//         if (nalogOdgovor.success) {
//             setNalog(nalogOdgovor.data)
//         }

//         const poduzeceOdgovor = await PoduzeceService.getBySifra(nalogOdgovor.data.sifraPoduzeca)
//         if (poduzeceOdgovor.success){
//             setPoduzece(poduzeceOdgovor.data)
//         }

//         const gradilisteOdgovor = await GradilisteService.getBySifra(nalogOdgovor.data.sifraGradilista)
//         if (gradilisteOdgovor.success){
//             setGradiliste(gradilisteOdgovor.data)
//         }


//     }

//     async function brisanje(sifra) {
//         if (!confirm('Sigurno obrisati?')) return
//         const odgovor = await StavkaService.obrisi(sifra)
//         if (odgovor.success) {
//             dohvatiSvePodatke()
//         }
//     }

//     return (
//         <div className="container">
//             <Link to={RouteNames.NALOG} className="btn btn-danger mt-3">Vrati</Link>
            
//             <Card className="mt-3 mb-4 shadow-sm">
//                 <Card.Body>
//                     <Row className="text-center">
//                         <Col md={4}>
//                             <div className="text-muted small text-uppercase">Nalog broj</div>
//                             <h4 className="fw-bold">{params.sifra}</h4>
//                             Planirani iznos {nalog.ukupniIznos}
//                         </Col>
//                         <Col md={4} className="border-start border-end">
//                             <div className="text-muted small text-uppercase">Poduzeće</div>
//                             <h4 className="fw-bold">{poduzece.naziv}</h4>
//                         </Col>
//                         <Col md={4}>
//                             <div className="text-muted small text-uppercase">Zgrada / Gradilište</div>
//                             <h4 className="fw-bold">{gradiliste.naziv}</h4>
//                         </Col>
//                     </Row>
//                 </Card.Body>
//             </Card>

//             <Table striped bordered hover responsive>
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Stavka</th>
//                         <th>Radnik</th>
//                         <th>Stroj</th>
//                         <th>Početak</th>
//                         <th>Završetak</th>
//                         <th>Sati</th>
//                         <th className="text-end">Iznos</th>
//                         <th className="text-center">Akcija</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {stavke && stavke.map((s) => (
//                         <tr key={s.sifra}>
//                             <td>{s.sifra}</td>
//                             <td>{s.sifraRadnika}</td>
//                             <td>{s.sifraStroja}</td>
//                             <td>{new Date(s.vrijemePocetka).toLocaleString('hr-HR')}</td>
//                             <td>{new Date(s.vrijemeZavrsetka).toLocaleString('hr-HR')}</td>
//                             <td>{s.sati} h</td>
//                             <td className="text-end">{Number(s.iznos).toFixed(2)} €</td>
//                             <td className="text-center">
//                                 <Button variant="primary" size="sm" className="me-2" onClick={() => navigate(`/stavka/promjena/${s.sifra}`)}>
//                                     Uredi
//                                 </Button>
//                                 <Button variant="danger" size="sm" onClick={() => brisanje(s.sifra)}>
//                                     Obriši
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//                 <tfoot>
//                     <tr className="table-secondary fw-bold">
//                         <td colSpan="6" className="text-end">UKUPAN IZNOS RADOVA:</td>
//                         <td className="text-end text-primary">
//                             {ukupniIznos.toFixed(2)} €
//                         </td>
//                         <td></td>
//                     </tr>
//                 </tfoot>
//             </Table>

//             {stavke.length === 0 && (
//                 <Alert variant="info">Ovaj nalog nema stavki u bazi.</Alert>
//             )}
//         </div>
//     )
// }



import { useEffect, useState } from "react"
import { Button, Table, Alert, Card, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../../constants"
import StavkaService from "../../../services/stavka/StavkaService"
import NalogService from "../../../services/nalog/NalogService"
import PoduzeceService from "../../../services/poduzece/PoduzeceService"
import GradilisteService from "../../../services/gradiliste/GradilistaService"

export default function StavkaPregled() {
    const navigate = useNavigate()
    const params = useParams()
    
    const [stavke, setStavke] = useState([])
    const [nalog, setNalog] = useState({})
    const [poduzece, setPoduzece] = useState({})
    const [gradiliste, setGradiliste] = useState({})

    useEffect(() => {
        dohvatiSvePodatke()
    }, [params.sifra])

    const ukupniIznos = stavke.reduce((acc, s) => acc + Number(s.iznos || 0), 0);

    async function dohvatiSvePodatke() {
        const odgovor = await StavkaService.get(params.sifra)
        if (odgovor.success) {
            setStavke(odgovor.data)
        }

        const nalogOdgovor = await NalogService.getBySifra(params.sifra)
        if (nalogOdgovor.success) {
            setNalog(nalogOdgovor.data)
            
            const poduzeceOdgovor = await PoduzeceService.getBySifra(nalogOdgovor.data.sifraPoduzeca)
            if (poduzeceOdgovor.success) setPoduzece(poduzeceOdgovor.data)

            const gradilisteOdgovor = await GradilisteService.getBySifra(nalogOdgovor.data.sifraGradilista)
            if (gradilisteOdgovor.success) setGradiliste(gradilisteOdgovor.data)
        }
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return
        const odgovor = await StavkaService.obrisi(sifra)
        if (odgovor.success) dohvatiSvePodatke()
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to={RouteNames.NALOG} className="btn btn-danger">Vrati</Link>
                {/* Putanja prema tvom: /nalog/:sifra/stavke/nova */}
                <Button variant="success" onClick={() => navigate(`/nalog/${params.sifra}/stavke/nova`)}>
                    Dodaj novu stavku
                </Button>
            </div>
            
            <Card className="mt-3 mb-4 shadow-sm">
                <Card.Body>
                    <Row className="text-center">
                        <Col md={4}>
                            <div className="text-muted small text-uppercase">Nalog broj</div>
                            <h4 className="fw-bold">{params.sifra}</h4>
                            Planirani iznos: {nalog.ukupniIznos} €
                        </Col>
                        <Col md={4} className="border-start border-end">
                            <div className="text-muted small text-uppercase">Poduzeće</div>
                            <h4 className="fw-bold">{poduzece.naziv}</h4>
                        </Col>
                        <Col md={4}>
                            <div className="text-muted small text-uppercase">Zgrada / Gradilište</div>
                            <h4 className="fw-bold">{gradiliste.naziv}</h4>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Stavka</th>
                        <th>Radnik</th>
                        <th>Stroj</th>
                        <th>Početak</th>
                        <th>Završetak</th>
                        <th>Sati</th>
                        <th className="text-end">Iznos</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {stavke.map((s) => (
                        <tr key={s.sifra}>
                            <td>{s.sifra}</td>
                            <td>{s.sifraRadnika}</td>
                            <td>{s.sifraStroja}</td>
                            <td>{new Date(s.vrijemePocetka).toLocaleString('hr-HR')}</td>
                            <td>{new Date(s.vrijemeZavrsetka).toLocaleString('hr-HR')}</td>
                            <td>{s.sati} h</td>
                            <td className="text-end">{Number(s.iznos).toFixed(2)} €</td>
                            <td className="text-center">
                                {/* Putanja prema tvom: /nalog/:sifraNalog/stavke/:sifraStavka */}
                                <Button variant="primary" size="sm" className="me-2" 
                                    onClick={() => navigate(`/nalog/${params.sifra}/stavke/${s.sifra}`)}>
                                    Uredi
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => brisanje(s.sifra)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="table-secondary fw-bold">
                        <td colSpan="6" className="text-end">UKUPAN IZNOS RADOVA:</td>
                        <td className="text-end text-primary">{ukupniIznos.toFixed(2)} €</td>
                        <td></td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}
