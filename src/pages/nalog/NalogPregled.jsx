// // // // import { useEffect, useState } from "react"
// // // // import NalogService from "../../services/nalog/NalogService"
// // // // import PoduzeceService from "../../services/poduzece/PoduzeceService"
// // // // import GradilisteService from "../../services/gradiliste/GradilistaService"
// // // // import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap"
// // // // import { Link, useNavigate } from "react-router-dom"
// // // // import { RouteNames } from "../../constants"
// // // // import { NumericFormat } from "react-number-format"
// // // // import { FaEdit, FaTrash, FaEye, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa"

// // // // export default function NalogPregled() {
// // // //     const navigate = useNavigate()

// // // //     const [poduzeca, setPoduzeca] = useState([])
// // // //     const [gradilista, setGradilista] = useState([])
// // // //     const [nalozi, setNalozi] = useState([])

// // // //     // State za filtriranje, sortiranje i paginaciju
// // // //     const [filterTekst, setFilterTekst] = useState("")
// // // //     const [sortKey, setSortKey] = useState("sifra") 
// // // //     const [sortOrder, setSortOrder] = useState("asc")
// // // //     const [currentPage, setCurrentPage] = useState(1)
// // // //     const [itemsPerPage, setItemsPerPage] = useState(10) // Zadano 10 redova

// // // //     useEffect(() => {
// // // //         ucitajPodatke()
// // // //     }, [])

// // // //     // Reset na prvu stranicu ako se promijeni broj stavki po stranici
// // // //     useEffect(() => {
// // // //         setCurrentPage(1);
// // // //     }, [itemsPerPage]);

// // // //     async function ucitajPodatke() {
// // // //         const resGradilista = await GradilisteService.get()
// // // //         const resPoduzeca = await PoduzeceService.get()
// // // //         const resNalozi = await NalogService.get()

// // // //         if (resGradilista.success) setGradilista(resGradilista.data)
// // // //         if (resPoduzeca.success) setPoduzeca(resPoduzeca.data)
// // // //         if (resNalozi.success) setNalozi(resNalozi.data)
// // // //     }

// // // //     async function brisanje(sifra) {
// // // //         if (!confirm('Sigurno obrisati?')) return;
// // // //         await NalogService.obrisi(sifra);
// // // //         const odgovor = await NalogService.get();
// // // //         if(odgovor.success) setNalozi(odgovor.data);
// // // //     }

// // // //     const dohvatiNazivPoduzeca = (sifra) => poduzeca.find(p => p.sifra === sifra)?.naziv || 'N/A';
// // // //     const dohvatiNazivGradilista = (sifra) => gradilista.find(g => g.sifra === sifra)?.naziv || 'N/A';

// // // //     // 1. Filtriranje
// // // //     const filtriraniNalozi = nalozi.filter(n => {
// // // //         const nazivP = dohvatiNazivPoduzeca(n.sifraPoduzeca).toLowerCase();
// // // //         const nazivG = dohvatiNazivGradilista(n.sifraGradilista).toLowerCase();
// // // //         const search = filterTekst.toLowerCase();
// // // //         return nazivP.includes(search) || nazivG.includes(search);
// // // //     });

// // // //     // 2. Sortiranje
// // // //     const sortiraniNalozi = [...filtriraniNalozi].sort((a, b) => {
// // // //         let valA, valB;
// // // //         if (sortKey === 'poduzece') {
// // // //             valA = dohvatiNazivPoduzeca(a.sifraPoduzeca);
// // // //             valB = dohvatiNazivPoduzeca(b.sifraPoduzeca);
// // // //         } else if (sortKey === 'gradiliste') {
// // // //             valA = dohvatiNazivGradilista(a.sifraGradilista);
// // // //             valB = dohvatiNazivGradilista(b.sifraGradiliste);
// // // //         } else {
// // // //             valA = a.sifra; valB = b.sifra;
// // // //         }
// // // //         return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
// // // //     });

// // // //     // 3. Paginacija
// // // //     const indexOfLastItem = currentPage * itemsPerPage;
// // // //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // // //     const currentItems = sortiraniNalozi.slice(indexOfFirstItem, indexOfLastItem);
// // // //     const totalPages = Math.ceil(sortiraniNalozi.length / itemsPerPage);

// // // //     const toggleSort = (key) => {
// // // //         if (sortKey === key) {
// // // //             setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// // // //         } else {
// // // //             setSortKey(key);
// // // //             setSortOrder("asc");
// // // //         }
// // // //     };

// // // //     return (
// // // //         <>
// // // //             <Link to={RouteNames.NALOG_NOVI} className="btn btn-success w-100 my-3">
// // // //                 Dodavanje novog naloga
// // // //             </Link>

// // // //             <Row className="mb-3 align-items-end">
// // // //                 <Col md={6}>
// // // //                     <Form.Group>
// // // //                         <Form.Label>Pretraži po poduzeću ili gradilištu:</Form.Label>
// // // //                         <Form.Control
// // // //                             type="text"
// // // //                             placeholder="Počni tipkati..."
// // // //                             value={filterTekst}
// // // //                             onChange={(e) => { setFilterTekst(e.target.value); setCurrentPage(1); }}
// // // //                         />
// // // //                     </Form.Group>
// // // //                 </Col>
// // // //                 <Col md={3} className="ms-auto">
// // // //                     <Form.Group>
// // // //                         <Form.Label>Redova po stranici:</Form.Label>
// // // //                         <Form.Select 
// // // //                             value={itemsPerPage} 
// // // //                             onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
// // // //                         >
// // // //                             <option value={5}>5</option>
// // // //                             <option value={10}>10</option>
// // // //                             <option value={20}>20</option>
// // // //                             <option value={50}>50</option>
// // // //                         </Form.Select>
// // // //                     </Form.Group>
// // // //                 </Col>
// // // //             </Row>

// // // //             <Table striped bordered hover responsive>
// // // //                 <thead>
// // // //                     <tr>
// // // //                         <th>Nalog broj</th>
// // // //                         <th onClick={() => toggleSort('poduzece')} style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}>
// // // //                             Poduzeće {sortKey === 'poduzece' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
// // // //                         </th>
// // // //                         <th onClick={() => toggleSort('gradiliste')} style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}>
// // // //                             Gradilište {sortKey === 'gradiliste' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
// // // //                         </th>
// // // //                         <th>Ukupni iznos</th>
// // // //                         <th className="text-center">Akcije</th>
// // // //                     </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                     {currentItems.length > 0 ? (
// // // //                         currentItems.map((nalog) => (
// // // //                             <tr key={nalog.sifra}>
// // // //                                 <td className='lead'>{nalog.sifra}</td>
// // // //                                 <td>{dohvatiNazivPoduzeca(nalog.sifraPoduzeca)}</td>
// // // //                                 <td>{dohvatiNazivGradilista(nalog.sifraGradilista)}</td>
// // // //                                 <td>
// // // //                                     <NumericFormat
// // // //                                         value={nalog.ukupniIznos}
// // // //                                         displayType={'text'}
// // // //                                         thousandSeparator='.'
// // // //                                         decimalSeparator=','
// // // //                                         suffix={' €'}
// // // //                                         decimalScale={2}
// // // //                                         fixedDecimalScale
// // // //                                     />
// // // //                                 </td>
// // // //                                 <td className="text-center">
// // // //                                     <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}`)}><FaEdit /></Button>
// // // //                                     <Button variant="outline-info" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}/stavke`)}><FaEye /></Button>
// // // //                                     <Button variant="danger" size="sm" onClick={() => brisanje(nalog.sifra)}><FaTrash /></Button>
// // // //                                 </td>
// // // //                             </tr>
// // // //                         ))
// // // //                     ) : (
// // // //                         <tr><td colSpan="5" className="text-center">Nema pronađenih podataka.</td></tr>
// // // //                     )}
// // // //                 </tbody>
// // // //             </Table>

// // // //             {totalPages > 1 && (
// // // //                 <Pagination className="justify-content-center mt-3">
// // // //                     <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
// // // //                     <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
// // // //                     {[...Array(totalPages).keys()].map(n => (
// // // //                         <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
// // // //                             {n + 1}
// // // //                         </Pagination.Item>
// // // //                     ))}
// // // //                     <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
// // // //                     <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
// // // //                 </Pagination>
// // // //             )}
// // // //         </>
// // // //     )
// // // // }

// // // import { useEffect, useState } from "react"
// // // import NalogService from "../../services/nalog/NalogService"
// // // import PoduzeceService from "../../services/poduzece/PoduzeceService"
// // // import GradilisteService from "../../services/gradiliste/GradilistaService"
// // // import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap"
// // // import { Link, useNavigate } from "react-router-dom"
// // // import { RouteNames } from "../../constants"
// // // import { NumericFormat } from "react-number-format"
// // // import { FaEdit, FaTrash, FaEye, FaSortAlphaDown, FaSortAlphaUp, FaFilePdf } from "react-icons/fa"

// // // // 📌 Uvoz za PDF
// // // import jsPDF from "jspdf"
// // // import "jspdf-autotable"

// // // export default function NalogPregled() {
// // //     const navigate = useNavigate()

// // //     const [poduzeca, setPoduzeca] = useState([])
// // //     const [gradilista, setGradilista] = useState([])
// // //     const [nalozi, setNalozi] = useState([])

// // //     const [filterTekst, setFilterTekst] = useState("")
// // //     const [sortKey, setSortKey] = useState("sifra") 
// // //     const [sortOrder, setSortOrder] = useState("asc")
// // //     const [currentPage, setCurrentPage] = useState(1)
// // //     const [itemsPerPage, setItemsPerPage] = useState(10)

// // //     useEffect(() => {
// // //         ucitajPodatke()
// // //     }, [])

// // //     async function ucitajPodatke() {
// // //         const resGradilista = await GradilisteService.get()
// // //         const resPoduzeca = await PoduzeceService.get()
// // //         const resNalozi = await NalogService.get()

// // //         if (resGradilista.success) setGradilista(resGradilista.data)
// // //         if (resPoduzeca.success) setPoduzeca(resPoduzeca.data)
// // //         if (resNalozi.success) setNalozi(resNalozi.data)
// // //     }

// // //     const dohvatiNazivPoduzeca = (sifra) => poduzeca.find(p => p.sifra === sifra)?.naziv || 'N/A';
// // //     const dohvatiNazivGradilista = (sifra) => gradilista.find(g => g.sifra === sifra)?.naziv || 'N/A';

// // //     // 1. Filtriranje
// // //     const filtriraniNalozi = nalozi.filter(n => {
// // //         const nazivP = dohvatiNazivPoduzeca(n.sifraPoduzeca).toLowerCase();
// // //         const nazivG = dohvatiNazivGradilista(n.sifraGradilista).toLowerCase();
// // //         const search = filterTekst.toLowerCase();
// // //         return nazivP.includes(search) || nazivG.includes(search);
// // //     });

// // //     // 2. Sortiranje
// // //     const sortiraniNalozi = [...filtriraniNalozi].sort((a, b) => {
// // //         let valA, valB;
// // //         if (sortKey === 'poduzece') {
// // //             valA = dohvatiNazivPoduzeca(a.sifraPoduzeca);
// // //             valB = dohvatiNazivPoduzeca(b.sifraPoduzeca);
// // //         } else if (sortKey === 'gradiliste') {
// // //             valA = dohvatiNazivGradilista(a.sifraGradilista);
// // //             valB = dohvatiNazivGradilista(b.sifraGradilista);
// // //         } else {
// // //             valA = a.sifra; valB = b.sifra;
// // //         }
// // //         return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
// // //     });

// // //     // --- FUNKCIJA ZA EXPORT U PDF ---
// // //     const exportToPDF = () => {
// // //         const doc = new jsPDF();
        
// // //         // Naslov u PDF-u
// // //         doc.text("Pregled naloga", 14, 15);
        
// // //         // Priprema podataka iz sortirane/filtrirane liste
// // //         const tableRows = sortiraniNalozi.map(n => [
// // //             n.sifra,
// // //             dohvatiNazivPoduzeca(n.sifraPoduzeca),
// // //             dohvatiNazivGradilista(n.sifraGradilista),
// // //             new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(n.ukupniIznos)
// // //         ]);

// // //         doc.autoTable({
// // //             head: [['Nalog br.', 'Poduzece', 'Gradiliste', 'Iznos']],
// // //             body: tableRows,
// // //             startY: 20,
// // //             theme: 'grid',
// // //             headStyles: { fillColor: [25, 135, 84] } // Zelena boja zaglavlja (success)
// // //         });

// // //         doc.save("nalozi.pdf");
// // //     };

// // //     // 3. Paginacija
// // //     const indexOfLastItem = currentPage * itemsPerPage;
// // //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// // //     const currentItems = sortiraniNalozi.slice(indexOfFirstItem, indexOfLastItem);
// // //     const totalPages = Math.ceil(sortiraniNalozi.length / itemsPerPage);

// // //     const toggleSort = (key) => {
// // //         if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// // //         else { setSortKey(key); setSortOrder("asc"); }
// // //     };

// // //     return (
// // //         <>
// // //             <Link to={RouteNames.NALOG_NOVI} className="btn btn-success w-100 my-3">
// // //                 Dodavanje novog naloga
// // //             </Link>

// // //             <Row className="mb-3 align-items-end">
// // //                 <Col md={5}>
// // //                     <Form.Group>
// // //                         <Form.Label>Pretraži:</Form.Label>
// // //                         <Form.Control
// // //                             type="text"
// // //                             placeholder="Počni tipkati..."
// // //                             value={filterTekst}
// // //                             onChange={(e) => { setFilterTekst(e.target.value); setCurrentPage(1); }}
// // //                         />
// // //                     </Form.Group>
// // //                 </Col>
// // //                 <Col md={2}>
// // //                     <Button variant="danger" className="w-100" onClick={exportToPDF}>
// // //                         <FaFilePdf className="me-2" /> PDF
// // //                     </Button>
// // //                 </Col>
// // //                 <Col md={3} className="ms-auto">
// // //                     <Form.Group>
// // //                         <Form.Label>Redova po stranici:</Form.Label>
// // //                         <Form.Select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
// // //                             <option value={5}>5</option>
// // //                             <option value={10}>10</option>
// // //                             <option value={20}>20</option>
// // //                         </Form.Select>
// // //                     </Form.Group>
// // //                 </Col>
// // //             </Row>

// // //             <Table striped bordered hover responsive>
// // //                 <thead>
// // //                     <tr>
// // //                         <th>Nalog broj</th>
// // //                         <th onClick={() => toggleSort('poduzece')} style={{ cursor: 'pointer' }}>
// // //                             Poduzeće {sortKey === 'poduzece' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
// // //                         </th>
// // //                         <th onClick={() => toggleSort('gradiliste')} style={{ cursor: 'pointer' }}>
// // //                             Gradilište {sortKey === 'gradiliste' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
// // //                         </th>
// // //                         <th>Ukupni iznos</th>
// // //                         <th className="text-center">Akcije</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {currentItems.map((nalog) => (
// // //                         <tr key={nalog.sifra}>
// // //                             <td>{nalog.sifra}</td>
// // //                             <td>{dohvatiNazivPoduzeca(nalog.sifraPoduzeca)}</td>
// // //                             <td>{dohvatiNazivGradilista(nalog.sifraGradilista)}</td>
// // //                             <td>
// // //                                 <NumericFormat
// // //                                     value={nalog.ukupniIznos}
// // //                                     displayType={'text'}
// // //                                     thousandSeparator='.'
// // //                                     decimalSeparator=','
// // //                                     suffix={' €'}
// // //                                     decimalScale={2}
// // //                                     fixedDecimalScale
// // //                                 />
// // //                             </td>
// // //                             <td className="text-center">
// // //                                 <Button variant="outline-primary" size="sm" className="me-1" onClick={() => navigate(`/nalog/${nalog.sifra}`)}><FaEdit /></Button>
// // //                                 <Button variant="outline-info" size="sm" className="me-1" onClick={() => navigate(`/nalog/${nalog.sifra}/stavke`)}><FaEye /></Button>
// // //                                 <Button variant="danger" size="sm" onClick={() => {/* brisanje logic */}}><FaTrash /></Button>
// // //                             </td>
// // //                         </tr>
// // //                     ))}
// // //                 </tbody>
// // //             </Table>

// // //             {totalPages > 1 && (
// // //                 <Pagination className="justify-content-center">
// // //                     {[...Array(totalPages).keys()].map(n => (
// // //                         <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
// // //                             {n + 1}
// // //                         </Pagination.Item>
// // //                     ))}
// // //                 </Pagination>
// // //             )}
// // //         </>
// // //     )
// // // }


// // import { useEffect, useState } from "react"
// // import NalogService from "../../services/nalog/NalogService"
// // import PoduzeceService from "../../services/poduzece/PoduzeceService"
// // import GradilisteService from "../../services/gradiliste/GradilistaService"
// // import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap"
// // import { Link, useNavigate } from "react-router-dom"
// // import { RouteNames } from "../../constants"
// // import { NumericFormat } from "react-number-format"

// // // 📌 Ikone i PDF biblioteke
// // import { FaEdit, FaTrash, FaEye, FaSortAlphaDown, FaSortAlphaUp, FaFilePdf } from "react-icons/fa"
// // import jsPDF from "jspdf"
// // import autoTable from "jspdf-autotable"

// // export default function NalogPregled() {
// //     const navigate = useNavigate()

// //     const [poduzeca, setPoduzeca] = useState([])
// //     const [gradilista, setGradilista] = useState([])
// //     const [nalozi, setNalozi] = useState([])

// //     // State za UI kontrolu
// //     const [filterTekst, setFilterTekst] = useState("")
// //     const [sortKey, setSortKey] = useState("sifra") 
// //     const [sortOrder, setSortOrder] = useState("asc")
// //     const [currentPage, setCurrentPage] = useState(1)
// //     const [itemsPerPage, setItemsPerPage] = useState(10)

// //     useEffect(() => {
// //         ucitajPodatke()
// //     }, [])

// //     async function ucitajPodatke() {
// //         const resGradilista = await GradilisteService.get()
// //         const resPoduzeca = await PoduzeceService.get()
// //         const resNalozi = await NalogService.get()

// //         if (resGradilista.success) setGradilista(resGradilista.data)
// //         if (resPoduzeca.success) setPoduzeca(resPoduzeca.data)
// //         if (resNalozi.success) setNalozi(resNalozi.data)
// //     }

// //     async function brisanje(sifra) {
// //         if (!confirm('Sigurno obrisati?')) return;
// //         await NalogService.obrisi(sifra);
// //         const odgovor = await NalogService.get();
// //         if(odgovor.success) setNalozi(odgovor.data);
// //     }

// //     // Helperi za nazive (koriste sifraPoduzeca i sifraGradilista)
// //     const dohvatiNazivPoduzeca = (sifra) => poduzeca.find(p => p.sifra === sifra)?.naziv || 'N/A';
// //     const dohvatiNazivGradilista = (sifra) => gradilista.find(g => g.sifra === sifra)?.naziv || 'N/A';

// //     // 1. Filtriranje podataka
// //     const filtriraniNalozi = nalozi.filter(n => {
// //         const nazivP = dohvatiNazivPoduzeca(n.sifraPoduzeca).toLowerCase();
// //         const nazivG = dohvatiNazivGradilista(n.sifraGradilista).toLowerCase();
// //         const search = filterTekst.toLowerCase();
// //         return nazivP.includes(search) || nazivG.includes(search);
// //     });

// //     // 2. Sortiranje podataka
// //     const sortiraniNalozi = [...filtriraniNalozi].sort((a, b) => {
// //         let valA, valB;
// //         if (sortKey === 'poduzece') {
// //             valA = dohvatiNazivPoduzeca(a.sifraPoduzeca);
// //             valB = dohvatiNazivPoduzeca(b.sifraPoduzeca);
// //         } else if (sortKey === 'gradiliste') {
// //             valA = dohvatiNazivGradilista(a.sifraGradilista);
// //             valB = dohvatiNazivGradilista(b.sifraGradilista);
// //         } else {
// //             valA = a.sifra; valB = b.sifra;
// //         }
// //         return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
// //     });

// //     // 3. Paginacija - izračun rezova
// //     const indexOfLastItem = currentPage * itemsPerPage;
// //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //     const currentItems = sortiraniNalozi.slice(indexOfFirstItem, indexOfLastItem);
// //     const totalPages = Math.ceil(sortiraniNalozi.length / itemsPerPage);

// //     const toggleSort = (key) => {
// //         if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //         else { setSortKey(key); setSortOrder("asc"); }
// //     };

// //     // 4. PDF Export funkcija (Fix: koristi direktni autoTable import)
// //     const exportToPDF = () => {
// //         const doc = new jsPDF();
// //         doc.text("Izvještaj: Pregled naloga", 14, 15);
        
// //         const tableRows = sortiraniNalozi.map(n => [
// //             n.sifra,
// //             dohvatiNazivPoduzeca(n.sifraPoduzeca),
// //             dohvatiNazivGradilista(n.sifraGradilista),
// //             new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(n.ukupniIznos)
// //         ]);

// //         autoTable(doc, {
// //             head: [['Nalog br.', 'Poduzeće', 'Gradilište', 'Iznos']],
// //             body: tableRows,
// //             startY: 20,
// //             theme: 'grid',
// //             headStyles: { fillColor: [40, 167, 69] } // Bootstrap success zelena
// //         });

// //         doc.save("nalozi_izvjestaj.pdf");
// //     };

// //     return (
// //         <>
// //             <Link to={RouteNames.NALOG_NOVI} className="btn btn-success w-100 my-3">
// //                 Dodavanje novog naloga
// //             </Link>

// //             <Row className="mb-3 align-items-end">
// //                 <Col md={5}>
// //                     <Form.Group>
// //                         <Form.Label>Pretraži poduzeća/gradilišta:</Form.Label>
// //                         <Form.Control
// //                             type="text"
// //                             placeholder="Pretraga..."
// //                             value={filterTekst}
// //                             onChange={(e) => { setFilterTekst(e.target.value); setCurrentPage(1); }}
// //                         />
// //                     </Form.Group>
// //                 </Col>
// //                 <Col md={2}>
// //                     <Button variant="danger" className="w-100" onClick={exportToPDF}>
// //                         <FaFilePdf className="me-2" /> PDF
// //                     </Button>
// //                 </Col>
// //                 <Col md={3} className="ms-auto">
// //                     <Form.Group>
// //                         <Form.Label>Redova po stranici:</Form.Label>
// //                         <Form.Select 
// //                             value={itemsPerPage} 
// //                             onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
// //                         >
// //                             <option value={5}>5</option>
// //                             <option value={10}>10</option>
// //                             <option value={20}>20</option>
// //                             <option value={50}>50</option>
// //                         </Form.Select>
// //                     </Form.Group>
// //                 </Col>
// //             </Row>

// //             <Table striped bordered hover responsive>
// //                 <thead>
// //                     <tr>
// //                         <th onClick={() => toggleSort('sifra')} style={{ cursor: 'pointer' }}>
// //                             Nalog br. {sortKey === 'sifra' && (sortOrder === 'asc' ? '↑' : '↓')}
// //                         </th>
// //                         <th onClick={() => toggleSort('poduzece')} style={{ cursor: 'pointer' }}>
// //                             Poduzeće {sortKey === 'poduzece' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
// //                         </th>
// //                         <th onClick={() => toggleSort('gradiliste')} style={{ cursor: 'pointer' }}>
// //                             Gradilište {sortKey === 'gradiliste' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
// //                         </th>
// //                         <th>Ukupni iznos</th>
// //                         <th className="text-center">Akcije</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {currentItems.length > 0 ? (
// //                         currentItems.map((nalog) => (
// //                             <tr key={nalog.sifra}>
// //                                 <td className='lead'>{nalog.sifra}</td>
// //                                 <td>{dohvatiNazivPoduzeca(nalog.sifraPoduzeca)}</td>
// //                                 <td>{dohvatiNazivGradilista(nalog.sifraGradilista)}</td>
// //                                 <td>
// //                                     <NumericFormat
// //                                         value={nalog.ukupniIznos}
// //                                         displayType={'text'}
// //                                         thousandSeparator='.'
// //                                         decimalSeparator=','
// //                                         suffix={' €'}
// //                                         decimalScale={2}
// //                                         fixedDecimalScale
// //                                     />
// //                                 </td>
// //                                 <td className="text-center">
// //                                     <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}`)}>
// //                                         <FaEdit />
// //                                     </Button>
// //                                     <Button variant="outline-info" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}/stavke`)}>
// //                                         <FaEye />
// //                                     </Button>
// //                                     <Button variant="danger" size="sm" onClick={() => brisanje(nalog.sifra)}>
// //                                         <FaTrash />
// //                                     </Button>
// //                                 </td>
// //                             </tr>
// //                         ))
// //                     ) : (
// //                         <tr><td colSpan="5" className="text-center text-muted">Nema podataka za prikaz.</td></tr>
// //                     )}
// //                 </tbody>
// //             </Table>

// //             {totalPages > 1 && (
// //                 <Pagination className="justify-content-center mt-3">
// //                     <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
// //                     <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
// //                     {[...Array(totalPages).keys()].map(n => (
// //                         <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
// //                             {n + 1}
// //                         </Pagination.Item>
// //                     ))}
// //                     <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
// //                     <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
// //                 </Pagination>
// //             )}
// //         </>
// //     )
// // }


// import { useEffect, useState } from "react"
// import NalogService from "../../services/nalog/NalogService"
// import PoduzeceService from "../../services/poduzece/PoduzeceService"
// import GradilisteService from "../../services/gradiliste/GradilistaService"
// import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap"
// import { Link, useNavigate } from "react-router-dom"
// import { RouteNames } from "../../constants"
// import { NumericFormat } from "react-number-format"

// // 📌 Ikone i PDF biblioteke
// import { FaEdit, FaTrash, FaEye, FaSortAlphaDown, FaSortAlphaUp, FaPrint } from "react-icons/fa"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"

// export default function NalogPregled() {
//     const navigate = useNavigate()

//     const [poduzeca, setPoduzeca] = useState([])
//     const [gradilista, setGradilista] = useState([])
//     const [nalozi, setNalozi] = useState([])

//     // State za UI kontrolu
//     const [filterTekst, setFilterTekst] = useState("")
//     const [sortKey, setSortKey] = useState("sifra") 
//     const [sortOrder, setSortOrder] = useState("asc")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [itemsPerPage, setItemsPerPage] = useState(10)

//     useEffect(() => {
//         ucitajPodatke()
//     }, [])

//     async function ucitajPodatke() {
//         const resGradilista = await GradilisteService.get()
//         const resPoduzeca = await PoduzeceService.get()
//         const resNalozi = await NalogService.get()

//         if (resGradilista.success) setGradilista(resGradilista.data)
//         if (resPoduzeca.success) setPoduzeca(resPoduzeca.data)
//         if (resNalozi.success) setNalozi(resNalozi.data)
//     }

//     async function brisanje(sifra) {
//         if (!confirm('Sigurno obrisati?')) return;
//         await NalogService.obrisi(sifra);
//         const odgovor = await NalogService.get();
//         if(odgovor.success) setNalozi(odgovor.data);
//     }

//     // Helperi za nazive
//     const dohvatiNazivPoduzeca = (sifra) => poduzeca.find(p => p.sifra === sifra)?.naziv || 'N/A';
//     const dohvatiNazivGradilista = (sifra) => gradilista.find(g => g.sifra === sifra)?.naziv || 'N/A';

//     // 1. Filtriranje
//     const filtriraniNalozi = nalozi.filter(n => {
//         const nazivP = dohvatiNazivPoduzeca(n.sifraPoduzeca).toLowerCase();
//         const nazivG = dohvatiNazivGradilista(n.sifraGradilista).toLowerCase();
//         const search = filterTekst.toLowerCase();
//         return nazivP.includes(search) || nazivG.includes(search);
//     });

//     // 2. Sortiranje
//     const sortiraniNalozi = [...filtriraniNalozi].sort((a, b) => {
//         let valA, valB;
//         if (sortKey === 'poduzece') {
//             valA = dohvatiNazivPoduzeca(a.sifraPoduzeca);
//             valB = dohvatiNazivPoduzeca(b.sifraPoduzeca);
//         } else if (sortKey === 'gradiliste') {
//             valA = dohvatiNazivGradilista(a.sifraGradilista);
//             valB = dohvatiNazivGradilista(b.sifraGradilista);
//         } else {
//             valA = a.sifra; valB = b.sifra;
//         }
//         return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
//     });

//     // 3. Paginacija
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = sortiraniNalozi.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(sortiraniNalozi.length / itemsPerPage);

//     const toggleSort = (key) => {
//         if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//         else { setSortKey(key); setSortOrder("asc"); }
//     };

//     // 4. PDF Funkcija za IZRAVAN ISPIS
//     const ispisPDF = () => {
//         const doc = new jsPDF();
//         doc.text("Izvještaj: Pregled naloga", 14, 15);
        
//         const tableRows = sortiraniNalozi.map(n => [
//             n.sifra,
//             dohvatiNazivPoduzeca(n.sifraPoduzeca),
//             dohvatiNazivGradilista(n.sifraGradilista),
//             new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(n.ukupniIznos)
//         ]);

//         autoTable(doc, {
//             head: [['Nalog br.', 'Poduzeće', 'Gradilište', 'Iznos']],
//             body: tableRows,
//             startY: 20,
//             theme: 'grid',
//             headStyles: { fillColor: [40, 167, 69] } // Success zelena
//         });

//         // Generiranje Blob URL-a i otvaranje dijaloga za ispis
//         const blobUrl = doc.output('bloburl');
//         const printWindow = window.open(blobUrl);
//         if (printWindow) {
//             printWindow.onload = () => {
//                 printWindow.print();
//             };
//         }
//     };

//     return (
//         <>
//             <Link to={RouteNames.NALOG_NOVI} className="btn btn-success w-100 my-3">
//                 Dodavanje novog naloga
//             </Link>

//             <Row className="mb-3 align-items-end">
//                 <Col md={5}>
//                     <Form.Group>
//                         <Form.Label>Pretraži poduzeća/gradilišta:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Pretraga..."
//                             value={filterTekst}
//                             onChange={(e) => { setFilterTekst(e.target.value); setCurrentPage(1); }}
//                         />
//                     </Form.Group>
//                 </Col>
//                 <Col md={2}>
//                     <Button variant="info" className="w-100" onClick={ispisPDF}>
//                         <FaPrint className="me-2" /> Ispiši
//                     </Button>
//                 </Col>
//                 <Col md={3} className="ms-auto">
//                     <Form.Group>
//                         <Form.Label>Redova po stranici:</Form.Label>
//                         <Form.Select 
//                             value={itemsPerPage} 
//                             onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
//                         >
//                             <option value={5}>5</option>
//                             <option value={10}>10</option>
//                             <option value={20}>20</option>
//                             <option value={50}>50</option>
//                         </Form.Select>
//                     </Form.Group>
//                 </Col>
//             </Row>

//             <Table striped bordered hover responsive>
//                 <thead>
//                     <tr>
//                         <th onClick={() => toggleSort('sifra')} style={{ cursor: 'pointer' }}>
//                             Nalog br. {sortKey === 'sifra' && (sortOrder === 'asc' ? '↑' : '↓')}
//                         </th>
//                         <th onClick={() => toggleSort('poduzece')} style={{ cursor: 'pointer' }}>
//                             Poduzeće {sortKey === 'poduzece' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
//                         </th>
//                         <th onClick={() => toggleSort('gradiliste')} style={{ cursor: 'pointer' }}>
//                             Gradilište {sortKey === 'gradiliste' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
//                         </th>
//                         <th>Ukupni iznos</th>
//                         <th className="text-center">Akcije</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentItems.length > 0 ? (
//                         currentItems.map((nalog) => (
//                             <tr key={nalog.sifra}>
//                                 <td className='lead'>{nalog.sifra}</td>
//                                 <td>{dohvatiNazivPoduzeca(nalog.sifraPoduzeca)}</td>
//                                 <td>{dohvatiNazivGradilista(nalog.sifraGradilista)}</td>
//                                 <td>
//                                     <NumericFormat
//                                         value={nalog.ukupniIznos}
//                                         displayType={'text'}
//                                         thousandSeparator='.'
//                                         decimalSeparator=','
//                                         suffix={' €'}
//                                         decimalScale={2}
//                                         fixedDecimalScale
//                                     />
//                                 </td>
//                                 <td className="text-center">
//                                     <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}`)}>
//                                         <FaEdit />
//                                     </Button>
//                                     <Button variant="outline-info" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}/stavke`)}>
//                                         <FaEye />
//                                     </Button>
//                                     <Button variant="danger" size="sm" onClick={() => brisanje(nalog.sifra)}>
//                                         <FaTrash />
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr><td colSpan="5" className="text-center text-muted">Nema podataka za prikaz.</td></tr>
//                     )}
//                 </tbody>
//             </Table>

//             {totalPages > 1 && (
//                 <Pagination className="justify-content-center mt-3">
//                     <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
//                     <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
//                     {[...Array(totalPages).keys()].map(n => (
//                         <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
//                             {n + 1}
//                         </Pagination.Item>
//                     ))}
//                     <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
//                     <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
//                 </Pagination>
//             )}
//         </>
//     )
// }
import { useEffect, useState } from "react"
import NalogService from "../../services/nalog/NalogService"
import PoduzeceService from "../../services/poduzece/PoduzeceService"
import GradilisteService from "../../services/gradiliste/GradilistaService"
import { Button, Table, Form, Row, Col, Pagination } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import { NumericFormat } from "react-number-format"

// 📌 Ikone i PDF biblioteke
import { FaEdit, FaTrash, FaEye, FaSortAlphaDown, FaSortAlphaUp, FaPrint } from "react-icons/fa"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

export default function NalogPregled() {
    const navigate = useNavigate()

    const [poduzeca, setPoduzeca] = useState([])
    const [gradilista, setGradilista] = useState([])
    const [nalozi, setNalozi] = useState([])

    // State za UI kontrolu
    const [filterTekst, setFilterTekst] = useState("")
    const [sortKey, setSortKey] = useState("sifra") 
    const [sortOrder, setSortOrder] = useState("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    useEffect(() => {
        ucitajPodatke()
    }, [])

    async function ucitajPodatke() {
        const resGradilista = await GradilisteService.get()
        const resPoduzeca = await PoduzeceService.get()
        const resNalozi = await NalogService.get()

        if (resGradilista.success) setGradilista(resGradilista.data)
        if (resPoduzeca.success) setPoduzeca(resPoduzeca.data)
        if (resNalozi.success) setNalozi(resNalozi.data)
    }

    async function brisanje(sifra) {
        if (!confirm('Sigurno obrisati?')) return;
        await NalogService.obrisi(sifra);
        const odgovor = await NalogService.get();
        if(odgovor.success) setNalozi(odgovor.data);
    }

    // Helperi za nazive
    const dohvatiNazivPoduzeca = (sifra) => poduzeca.find(p => p.sifra === sifra)?.naziv || 'N/A';
    const dohvatiNazivGradilista = (sifra) => gradilista.find(g => g.sifra === sifra)?.naziv || 'N/A';

    // 1. Filtriranje
    const filtriraniNalozi = nalozi.filter(n => {
        const nazivP = dohvatiNazivPoduzeca(n.sifraPoduzeca).toLowerCase();
        const nazivG = dohvatiNazivGradilista(n.sifraGradilista).toLowerCase();
        const search = filterTekst.toLowerCase();
        return nazivP.includes(search) || nazivG.includes(search);
    });

    // 2. Sortiranje
    const sortiraniNalozi = [...filtriraniNalozi].sort((a, b) => {
        let valA, valB;
        if (sortKey === 'poduzece') {
            valA = dohvatiNazivPoduzeca(a.sifraPoduzeca);
            valB = dohvatiNazivPoduzeca(b.sifraPoduzeca);
        } else if (sortKey === 'gradiliste') {
            valA = dohvatiNazivGradilista(a.sifraGradilista);
            valB = dohvatiNazivGradilista(b.sifraGradilista);
        } else {
            valA = a.sifra; valB = b.sifra;
        }
        return sortOrder === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    // --- IZRAČUN UKUPNOG ZBROJA (za filtrirane podatke) ---
    const ukupnaSuma = filtriraniNalozi.reduce((acc, n) => acc + (n.ukupniIznos || 0), 0);

    // 3. Paginacija
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortiraniNalozi.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortiraniNalozi.length / itemsPerPage);

    const toggleSort = (key) => {
        if (sortKey === key) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        else { setSortKey(key); setSortOrder("asc"); }
    };

    // 4. PDF Funkcija s UKUPNIM IZNOSOM
    const ispisPDF = () => {
        const doc = new jsPDF();
        doc.text("Izvještaj: Pregled naloga", 14, 15);
        
        const tableRows = sortiraniNalozi.map(n => [
            n.sifra,
            dohvatiNazivPoduzeca(n.sifraPoduzeca),
            dohvatiNazivGradilista(n.sifraGradilista),
            new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(n.ukupniIznos)
        ]);

        // Dodajemo red za ukupno na kraj PDF tablice
        tableRows.push([
            { content: 'UKUPNO:', colSpan: 3, styles: { halign: 'right', fontStyle: 'bold' } },
            { content: new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR' }).format(ukupnaSuma), styles: { fontStyle: 'bold' } }
        ]);

        autoTable(doc, {
            head: [['Nalog br.', 'Poduzeće', 'Gradilište', 'Iznos']],
            body: tableRows,
            startY: 20,
            theme: 'grid',
            headStyles: { fillColor: [40, 167, 69] } 
        });

        const blobUrl = doc.output('bloburl');
        const printWindow = window.open(blobUrl);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    return (
        <>
            <Link to={RouteNames.NALOG_NOVI} className="btn btn-success w-100 my-3">
                Dodavanje novog naloga
            </Link>

            <Row className="mb-3 align-items-end">
                <Col md={5}>
                    <Form.Group>
                        <Form.Label>Pretraži poduzeća/gradilišta:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Pretraga..."
                            value={filterTekst}
                            onChange={(e) => { setFilterTekst(e.target.value); setCurrentPage(1); }}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Button variant="info" className="w-100" onClick={ispisPDF}>
                        <FaPrint className="me-2" /> Ispiši
                    </Button>
                </Col>
                <Col md={3} className="ms-auto">
                    <Form.Group>
                        <Form.Label>Redova po stranici:</Form.Label>
                        <Form.Select 
                            value={itemsPerPage} 
                            onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th onClick={() => toggleSort('sifra')} style={{ cursor: 'pointer' }}>
                            Nalog br. {sortKey === 'sifra' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </th>
                        <th onClick={() => toggleSort('poduzece')} style={{ cursor: 'pointer' }}>
                            Poduzeće {sortKey === 'poduzece' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
                        </th>
                        <th onClick={() => toggleSort('gradiliste')} style={{ cursor: 'pointer' }}>
                            Gradilište {sortKey === 'gradiliste' && (sortOrder === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />)}
                        </th>
                        <th>Ukupni iznos</th>
                        <th className="text-center">Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        <>
                            {currentItems.map((nalog) => (
                                <tr key={nalog.sifra}>
                                    <td className='lead'>{nalog.sifra}</td>
                                    <td>{dohvatiNazivPoduzeca(nalog.sifraPoduzeca)}</td>
                                    <td>{dohvatiNazivGradilista(nalog.sifraGradilista)}</td>
                                    <td>
                                        <NumericFormat
                                            value={nalog.ukupniIznos}
                                            displayType={'text'}
                                            thousandSeparator='.'
                                            decimalSeparator=','
                                            suffix={' €'}
                                            decimalScale={2}
                                            fixedDecimalScale
                                        />
                                    </td>
                                    <td className="text-center">
                                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}`)}><FaEdit /></Button>
                                        <Button variant="outline-info" size="sm" className="me-2" onClick={() => navigate(`/nalog/${nalog.sifra}/stavke`)}><FaEye /></Button>
                                        <Button variant="danger" size="sm" onClick={() => brisanje(nalog.sifra)}><FaTrash /></Button>
                                    </td>
                                </tr>
                            ))}
                            {/* RED ZA UKUPNU SUMU U TABLICI */}
                            <tr className="table-secondary">
                                <td colSpan="3" className="text-end fw-bold">UKUPNO (filtrirano):</td>
                                <td colSpan="2" className="fw-bold">
                                    <NumericFormat
                                        value={ukupnaSuma}
                                        displayType={'text'}
                                        thousandSeparator='.'
                                        decimalSeparator=','
                                        suffix={' €'}
                                        decimalScale={2}
                                        fixedDecimalScale
                                    />
                                </td>
                            </tr>
                        </>
                    ) : (
                        <tr><td colSpan="5" className="text-center text-muted">Nema podataka za prikaz.</td></tr>
                    )}
                </tbody>
            </Table>

            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-3">
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map(n => (
                        <Pagination.Item key={n + 1} active={n + 1 === currentPage} onClick={() => setCurrentPage(n + 1)}>
                            {n + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            )}
        </>
    )
}
