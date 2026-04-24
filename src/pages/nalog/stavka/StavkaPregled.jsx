import { useEffect, useState } from "react"
import { Button, Table, Card, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../../constants"
import StavkaService from "../../../services/stavka/StavkaService"
import NalogService from "../../../services/nalog/NalogService"
import PoduzeceService from "../../../services/poduzece/PoduzeceService"
import GradilisteService from "../../../services/gradiliste/GradilistaService"
import RadnikService from "../../../services/radnici/RadnikService"
import StrojService from "../../../services/strojevi/StrojService" // DODANO

// Uvoz ikona iz react-icons paketa
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa"

// Uvoz jsPDF paketa za generiranje PDF-a
import jsPDF from "jspdf"
import "jspdf-autotable"
import autoTable from "jspdf-autotable"

export default function StavkaPregled() {
    const navigate = useNavigate()
    const params = useParams()
    
    const [stavke, setStavke] = useState([])
    const [nalog, setNalog] = useState({})
    const [poduzece, setPoduzece] = useState({})
    const [gradiliste, setGradiliste] = useState({})
    const [radnici, setRadnici] = useState([])
    const [strojevi, setStrojevi] = useState([]) // DODANO: Stanje za strojeve

    useEffect(() => {
        dohvatiSvePodatke()
    }, [params.sifra])

    const ukupniIznos = stavke.reduce((acc, s) => acc + Number(s.iznos || 0), 0);

    async function dohvatiSvePodatke() {
        const odgovor = await StavkaService.get(params.sifra)
        if (odgovor.success) {
            const podaci = odgovor.data
            let rb = 1
            podaci.map((e) => {
                e.rb = rb++
            })
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

        const radniciOdgovor = await RadnikService.get()
        if (radniciOdgovor.success) {
            setRadnici(radniciOdgovor.data)
        }

        // DODANO: Dohvaćanje svih strojeva iz baze
        const strojeviOdgovor = await StrojService.get()
        if (strojeviOdgovor.success) {
            setStrojevi(strojeviOdgovor.data)
        }
    }

    function dohvatiImeRadnika(sifraRadnika) {
        const radnik = radnici.find(r => r.sifra === sifraRadnika)
        return radnik ? `${radnik.ime} ${radnik.prezime}` : `Šifra: ${sifraRadnika}`
    }

    // DODANO: Pomoćna funkcija za ispis naziva stroja
    function dohvatiNazivStroja(sifraStroja) {
        const stroj = strojevi.find(s => s.sifra === sifraStroja)
        return stroj ? stroj.naziv : `Šifra: ${sifraStroja}`
    }

//     async function brisanje(sifra) {
//         if (!confirm('Sigurno obrisati?')) return
//         const odgovor = await StavkaService.obrisi(sifra)
//         dohvatiSvePodatke()
//     }


    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return
        const odgovor = await StavkaService.obrisi(sifra)
        dohvatiSvePodatke()
    }

    // 🖨️ FUNKCIJA ZA PRINTANJE PDF DOKUMENTA
    function generirajPDF() {
        const doc = new jsPDF();

        // 1. Zaglavlje dokumenta
        doc.setFontSize(18);
        doc.text(`RADNI NALOG br. ${params.sifra}`, 14, 15);
        
        doc.setFontSize(10);
        doc.text(`Poduzece: ${poduzece.naziv || 'N/A'}`, 14, 25);
        doc.text(`Gradiliste: ${gradiliste.naziv || 'N/A'}`, 14, 30);
        doc.text(`Planirani iznos: ${(nalog.ukupniIznos || 0).toFixed(2)} €`, 14, 35);

        // 2. Podaci za tablicu
        const stupci = ["Stavka", "Radnik", "Stroj", "Pocetak", "Zavrsetak", "Sati", "Iznos"];
        const redovi = stavke.map(s => [
            s.rb,
            dohvatiImeRadnika(s.sifraRadnika),
            dohvatiNazivStroja(s.sifraStroja), // POPRAVLJENO: Prikaz stroja u PDF-u
            new Date(s.vrijemePocetka).toLocaleString('hr-HR'),
            new Date(s.vrijemeZavrsetka).toLocaleString('hr-HR'),
            `${s.sati} h`,
            `${Number(s.iznos).toFixed(2)} €`
        ]);

        // Dodavanje reda za ukupno
        redovi.push([
            "", "", "", "", "", 
            "UKUPNO:", 
            `${ukupniIznos.toFixed(2)} €`
        ]);

        // 3. Generiranje tablice u PDF-u
        autoTable(doc,{
            head: [stupci],
            body: redovi,
            startY: 45,
            theme: 'striped',
            headStyles: { fillColor: [50, 50, 50] }, // Tamno siva boja
            styles: { fontSize: 9 }
        });

        // 4. METODA SKRIVENOG IFRAME-a ZA SIGURAN ISPIS
        doc.autoPrint(); 
        
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0.01'; 
        
        iframe.src = doc.output('bloburl'); 
        document.body.appendChild(iframe);

        // Čekamo sekundu da se PDF učita u okviru i zatim pozivamo ispis
        setTimeout(() => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
            
            // Nakon što korisnik ugasi prozor pisača, brišemo okvir
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        }, 1000);
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to={RouteNames.NALOG} className="btn btn-danger">Vrati</Link>
                
                <div>
                    {/* TIPKA ZA PRINTANJE PDF-a */}
                    <Button variant="outline-success" className="me-2" onClick={generirajPDF}>
                        <FaPrint className="me-2" /> Isprintaj PDF
                    </Button>
                    
                    <Button variant="success" onClick={() => navigate(`/nalog/${params.sifra}/stavke/nova`)}>
                        Dodaj novu stavku
                    </Button>
                </div>
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
                            <td>{s.rb}</td>
                            <td>{dohvatiImeRadnika(s.sifraRadnika)}</td>
                            <td>{dohvatiNazivStroja(s.sifraStroja)}</td> {/* POPRAVLJENO: Prikaz stroja u tablici */}
                            <td>{new Date(s.vrijemePocetka).toLocaleString('hr-HR')}</td>
                            <td>{new Date(s.vrijemeZavrsetka).toLocaleString('hr-HR')}</td>
                            <td>{s.sati} h</td>
                            <td className="text-end">{Number(s.iznos).toFixed(2)} €</td>
                            <td className="text-center">
                                {/* Gumb Uredi (Olovka) */}
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    className="me-2" 
                                    title="Uredi stavku"
                                    onClick={() => navigate(`/nalog/${params.sifra}/stavke/${s.sifra}`)}
                                >
                                    <FaEdit />
                                </Button>

                                {/* Gumb Obriši (Kanta) */}
                                <Button 
                                    variant="outline-danger" 
                                    size="sm" 
                                    title="Obriši stavku"
                                    onClick={() => brisanje(s.sifra)}
                                >
                                    <FaTrash />
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
