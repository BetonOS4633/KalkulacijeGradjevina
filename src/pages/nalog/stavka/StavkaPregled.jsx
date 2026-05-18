
import { useEffect, useState } from "react"
import { Button, Table, Card, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { RouteNames } from "../../../constants"
import StavkaService from "../../../services/stavka/StavkaService"
import NalogService from "../../../services/nalog/NalogService"
import PoduzeceService from "../../../services/poduzece/PoduzeceService"
import GradilisteService from "../../../services/gradiliste/GradilistaService"
import RadnikService from "../../../services/radnici/RadnikService"
import StrojService from "../../../services/strojevi/StrojService" 

// Uvoz ikona iz react-icons paketa
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa"

// Uvoz jsPDF paketa za generiranje PDF-a
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

export default function StavkaPregled() {
    const navigate = useNavigate()
    const params = useParams()
    
    const [stavke, setStavke] = useState([])
    const [nalog, setNalog] = useState({})
    const [poduzece, setPoduzece] = useState({})
    const [gradiliste, setGradiliste] = useState({})
    const [radnici, setRadnici] = useState([])
    const [strojevi, setStrojevi] = useState([]) 

    useEffect(() => {
        dohvatiSvePodatke()
    }, [params.sifra])

    // Izračun ukupnog iznosa iz svih stavki na ovom nalogu
    const ukupniIznos = stavke.reduce((acc, s) => {
        const iznosNumericki = parseFloat(s.iznos)
        return acc + (isNaN(iznosNumericki) ? 0 : iznosNumericki)
    }, 0);

    async function dohvatiSvePodatke() {
        const odgovor = await StavkaService.get(params.sifra)
        if (odgovor.success) {
            const podaci = odgovor.data || []
            let rb = 1
            podaci.forEach((e) => {
                e.rb = rb++
            })
            setStavke(podaci)
        }

        const nalogOdgovor = await NalogService.getBySifra(params.sifra)
        if (nalogOdgovor.success && nalogOdgovor.data) {
            setNalog(nalogOdgovor.data)
            
            if (nalogOdgovor.data.sifraPoduzeca) {
                const poduzeceOdgovor = await PoduzeceService.getBySifra(nalogOdgovor.data.sifraPoduzeca)
                if (poduzeceOdgovor.success && poduzeceOdgovor.data) setPoduzece(poduzeceOdgovor.data)
            }

            if (nalogOdgovor.data.sifraGradilista) {
                const gradilisteOdgovor = await GradilisteService.getBySifra(nalogOdgovor.data.sifraGradilista)
                if (gradilisteOdgovor.success && gradilisteOdgovor.data) setGradiliste(gradilisteOdgovor.data)
            }
        } else {
            setNalog({})
        }

        const radniciOdgovor = await RadnikService.get()
        if (radniciOdgovor.success) {
            setRadnici(radniciOdgovor.data || [])
        }

        const strojeviOdgovor = await StrojService.get()
        if (strojeviOdgovor.success) {
            setStrojevi(strojeviOdgovor.data || [])
        }
    }

    // Pretvaramo šifru u broj jer lokalno spremište zna vratiti string
    function dohvatiImeRadnika(sifraRadnika) {
        if (!sifraRadnika) return "Nije odabran"
        const radnik = radnici.find(r => r.sifra === parseInt(sifraRadnika))
        return radnik ? `${radnik.ime} ${radnik.prezime}` : `Šifra: ${sifraRadnika}`
    }

    // Pretvaramo šifru u broj zbog stroge provjere === u JavaScriptu
    function dohvatiNazivStroja(sifraStroja) {
        if (!sifraStroja) return "Nije odabran"
        const stroj = strojevi.find(s => s.sifra === parseInt(sifraStroja))
        return stroj ? stroj.naziv : `Šifra: ${sifraStroja}`
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return
        await StavkaService.obrisi(sifra)
        dohvatiSvePodatke()
    }

    // 🖨️ FUNKCIJA ZA PRINTANJE PDF DOKUMENTA
    function generirajPDF() {
        const doc = new jsPDF();

        // 1. Zaglavlje dokumenta
        doc.setFontSize(18);
        doc.text(`RADNI NALOG br. ${params.sifra}`, 14, 15);
        
        doc.setFontSize(10);
        doc.text(`Poduzece: ${poduzece?.naziv || 'N/A'}`, 14, 25);
        doc.text(`OIB: ${poduzece?.oib || 'N/A'}`, 14, 30);
        doc.text(`Adresa: ${poduzece?.adresa || 'N/A'}`, 14, 35);
        doc.text(`Telefon: ${poduzece?.telefon || 'N/A'}`, 14, 40);
        doc.text(`E-mail: ${poduzece?.email || 'N/A'}`, 14, 45);

        doc.text(`Gradilište: ${gradiliste?.naziv || 'N/A'}`, 14, 55);
        doc.text(`OIB gradilišta: ${gradiliste?.oib || 'N/A'}`, 14, 60);
        doc.text(`Adresa gradilišta: ${gradiliste?.adresa || 'N/A'}`, 14, 65);
        doc.text(`Mjesto gradilišta: ${gradiliste?.mjesto || 'N/A'}`, 14, 70);
        
        // Osiguravamo ispis planiranog iznosa u PDF-u bez rušenja koda
        const planiraniIznosNaloga = parseFloat(nalog?.ukupniIznos || 0);
        doc.text(`Planirani iznos: ${isNaN(planiraniIznosNaloga) ? '0.00' : planiraniIznosNaloga.toFixed(2)} €`, 14, 75);

        const formatirajDatum = (vrijeme) => {
            if (!vrijeme) return 'N/A';
            const d = new Date(vrijeme);
            return isNaN(d.getTime()) ? 'N/A' : d.toLocaleString('hr-HR');
        };

        // 2. Podaci za tablicu
        const stupci = ["Stavka", "Radnik", "Stroj", "Početak", "Završetak", "Sati", "Iznos"];
        const redovi = stavke.map(s => [
            s.rb,
            dohvatiImeRadnika(s.sifraRadnika),
            dohvatiNazivStroja(s.sifraStroja),
            formatirajDatum(s.vrijemePocetka),
            formatirajDatum(s.vrijemeZavrsetka),
            `${s.sati || 0} h`,
            `${parseFloat(s.iznos || 0).toFixed(2)} €`
        ]);

        redovi.push([
            "", "", "", "", "", 
            "UKUPNO:", 
            `${ukupniIznos.toFixed(2)} €`
        ]);

        // 3. Generiranje tablice u PDF-u
        autoTable(doc, {
            head: [stupci],
            body: redovi,
            startY: 85,
            theme: 'striped',
            headStyles: { fillColor: [50, 50, 50] },
            styles: { fontSize: 9 },
            columnStyles: {
                5: { halign: 'right' },
                6: { halign: 'right' }
            }
        });

        // 4. METODA SKRIVENOG IFRAME-a ZA SIGURAN ISPIS
        doc.autoPrint(); 
        
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0.01'; 
        
        const blobUrl = doc.output('bloburl'); 
        iframe.src = blobUrl; 
        document.body.appendChild(iframe);

        iframe.onload = () => {
            setTimeout(() => {
                try {
                    iframe.contentWindow.focus();
                    iframe.contentWindow.print();
                } catch (error) {
                    console.error("Greška pri ispisu:", error);
                }
                
                setTimeout(() => {
                    document.body.removeChild(iframe);
                    URL.revokeObjectURL(blobUrl);
                }, 2000);
            }, 500);
        };
    }

    // Izvlačimo planirani iznos u varijablu radi čišćeg koda u JSX-u
    const planiraniIznosZaslon = parseFloat(nalog?.ukupniIznos || 0);

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to={RouteNames.NALOG} className="btn btn-danger">Vrati</Link>
                
                <div>
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
                            Planirani iznos: {isNaN(planiraniIznosZaslon) ? '0.00' : planiraniIznosZaslon.toFixed(2)} €
                        </Col>
                        <Col md={4} className="border-start border-end">
                            <div className="text-muted small text-uppercase">Poduzeće</div>
                            <h4 className="fw-bold">{poduzece?.naziv || 'N/A'}</h4>
                            <div className="small text-muted">
                                OIB: {poduzece?.oib || 'N/A'}<br />
                                Adresa: {poduzece?.adresa || 'N/A'}<br />
                                Tel: {poduzece?.telefon || 'N/A'}<br />
                                E-mail: {poduzece?.email || 'N/A'}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-muted small text-uppercase">Zgrada / Gradilište</div>
                            <h4 className="fw-bold">{gradiliste?.naziv || 'N/A'}</h4>
                            <div className="small text-muted">
                                OIB: {gradiliste?.oib || 'N/A'}<br />
                                Adresa: {gradiliste?.adresa || 'N/A'}<br />
                                Mjesto: {gradiliste?.mjesto || 'N/A'}
                            </div>
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
                            <td>{dohvatiNazivStroja(s.sifraStroja)}</td>
                            <td>{s.vrijemePocetka ? new Date(s.vrijemePocetka).toLocaleString('hr-HR') : 'N/A'}</td>
                            <td>{s.vrijemeZavrsetka ? new Date(s.vrijemeZavrsetka).toLocaleString('hr-HR') : 'N/A'}</td>
                            <td>{s.sati || 0} h</td>
                            <td className="text-end">{parseFloat(s.iznos || 0).toFixed(2)} €</td>
                            <td className="text-center">
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    className="me-2" 
                                    title="Uredi stavku"
                                    onClick={() => navigate(`/nalog/${params.sifra}/stavke/${s.sifra}`)}
                                >
                                    <FaEdit />
                                </Button>

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
