// // import { Button, Col, Form, Row } from "react-bootstrap"
// // import { RouteNames } from "../../constants"
// // import { Link, useNavigate } from "react-router-dom"
// // import GradilisteService from "../../services/gradiliste/GradilistaService"

// // export default function GradilisteNovi(){

// //     const navigate = useNavigate()

// //     async function dodaj(gradiliste){
// //         await GradilisteService.dodaj(gradiliste).then(()=>{
// //             navigate(RouteNames.GRADILISTE)
// //         })
// //     }

// //     function odradiSubmit(e){ // e je event
// //         e.preventDefault() // nemoj odraditi submit
// //         const podaci = new FormData(e.target)

// //          // --- KONTROLA 1: Ime (Postojanje) ---
// //          if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
// //              alert("Naziv je obavezan i ne smije sadržavati samo razmake!");
// //              return;
// //          }

// //          // --- KONTROLA 2: Ime (Minimalna duljina) ---
// //          if (podaci.get('naziv').trim().length < 2) {
// //              alert("Naziv mora imati najmanje 2 znaka!");
// //              return;
// //          }

// //          // --- KONTROLA 3: Adresa (Postojanje) ---
// //          if (!podaci.get('adresa') || podaci.get('adresa').trim().length === 0) {
// //              alert("Adresa je obavezna i ne smije sadržavati samo razmake!");
// //              return;
// //          }

// //          // --- KONTROLA 4: Adresa (Minimalna duljina) ---
// //          if (podaci.get('adresa').trim().length < 2) {
// //              alert("Adresa mora imati najmanje 2 znaka!");
// //              return;
// //          }


// //         // --- KONTROLA 5: Mjesto (Postojanje) ---
// //          if (!podaci.get('mjesto') || podaci.get('mjesto').trim().length === 0) {
// //              alert("Mjesto je obavezno i ne smije sadržavati samo razmake!");
// //              return;
// //          }

// //          // --- KONTROLA 6: Mjesto (Minimalna duljina) ---
// //          if (podaci.get('mjesto').trim().length < 2) {
// //              alert("Mjesto mora imati najmanje 2 znaka!");
// //              return;
// //          }


// //         //  // --- KONTROLA 7: Email (Postojanje) ---
// //         //  if (!podaci.get('email') || podaci.get('email').trim().length === 0) {
// //         //      alert("Email je obavezan!");
// //         //      return;
// //         //  }

// //         //  // --- KONTROLA 6: Email (Format) ---
// //         //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //         //  if (!emailRegex.test(podaci.get('email'))) {
// //         //      alert("Email nije u ispravnom formatu!");
// //         //      return;
// //         //  }

// //          // --- KONTROLA 7: OIB (Postojanje) ---
// //          if (!podaci.get('oib') || podaci.get('oib').trim().length === 0) {
// //              alert("OIB je obavezan!");
// //              return;
// //          }

// //          // --- KONTROLA 8: OIB (Duljina) ---
// //          if (podaci.get('oib').trim().length !== 11) {
// //              alert("OIB mora imati točno 11 znamenki!");
// //              return;
// //          }

// //          // --- KONTROLA 9: OIB (Samo brojevi) ---
// //          if (!/^\d+$/.test(podaci.get('oib'))) {
// //              alert("OIB smije sadržavati samo brojeve!");
// //              return;
// //          }

// //         dodaj({
// //             naziv: podaci.get('naziv'),
// //             adresa: podaci.get('adresa'),
// //             mjesto: podaci.get('mjesto'),
// //             oib: podaci.get('oib')
// //         })
// //     }

// //     return (
// //         <>
// //             <h3>Unos novog gradilišta</h3>
// //             <Form onSubmit={odradiSubmit}>
// //                 <Form.Group controlId="naziv">
// //                     <Form.Label>Naziv</Form.Label>
// //                     <Form.Control type="text" name="naziv" required />
// //                 </Form.Group>

// //                 <Form.Group controlId="adresa">
// //                     <Form.Label>Adresa</Form.Label>
// //                     <Form.Control type="text" name="adresa" required />
// //                 </Form.Group>

// //                 <Form.Group controlId="mjesto">
// //                     <Form.Label>Mjesto</Form.Label>
// //                     <Form.Control type="text" name="mjesto" required />
// //                 </Form.Group>


// //                 <Form.Group controlId="oib">
// //                     <Form.Label>OIB</Form.Label>
// //                     <Form.Control type="text" name="oib" required maxLength={11} />
// //                 </Form.Group>

// //                 <Row className="mt-4">
// //                     <Col>
// //                         <Link to={RouteNames.GRADILISTE} className="btn btn-danger">
// //                             Odustani
// //                         </Link>
// //                     </Col>
// //                     <Col>
// //                         <Button type="submit" variant="success">
// //                             Dodaj novo gradiliste
// //                         </Button>
// //                     </Col>
// //                 </Row>

// //             </Form>
// //         </>
// //     )
// // }
// import { Button, Col, Form, Row } from "react-bootstrap"
// import { RouteNames } from "../../constants"
// import { Link, useNavigate } from "react-router-dom"
// import GradilisteService from "../../services/gradiliste/GradilistaService"
// import { useState } from "react"
// import { z } from "zod"

// // 1. Definiranje Zod sheme (ostaje ista zbog matematičke kontrole OIB-a)
// const gradilisteSchema = z.object({
//     naziv: z.string().trim().min(2, "Naziv mora imati najmanje 2 znaka"),
//     adresa: z.string().trim().min(2, "Adresa mora imati najmanje 2 znaka (Ulica i broj)"),
//     mjesto: z.string().trim().regex(/\d{5}/, "Mjesto mora sadržavati poštanski broj (5 znamenki)"),
//     oib: z.string().trim()
//         .length(11, "OIB mora imati točno 11 znamenki")
//         .regex(/^\d+$/, "OIB smije sadržavati samo brojeve")
//         .refine((oib) => {
//             if (oib.length !== 11) return false;
//             let a = 10;
//             for (let i = 0; i < 10; i++) {
//                 a = a + parseInt(oib.substr(i, 1), 10);
//                 a = a % 10;
//                 if (a === 0) a = 10;
//                 a *= 2;
//                 a = a % 11;
//             }
//             let kontrolni = 11 - a;
//             if (kontrolni === 10) kontrolni = 0;
//             return kontrolni === parseInt(oib.substr(10, 1), 10);
//         }, "OIB nije matematički ispravan")
// });

// export default function GradilisteNovi() {
//     const navigate = useNavigate();

//     // State za čuvanje grešaka
//     const [greske, setGreske] = useState({});

//     // FUNKCIJA KOJA ODMAH JAVLJA GREŠKU
//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         // Validacija samo polja koje se mijenja
//         const poljeSchema = gradilisteSchema.pick({ [name]: true });
//         const rezultat = poljeSchema.safeParse({ [name]: value });

//         if (!rezultat.success) {
//             // Ako nije ispravno, izvuci prvu poruku o grešci
//             const formatiraneGreske = rezultat.error.format();
//             setGreske(prev => ({ 
//                 ...prev, 
//                 [name]: formatiraneGreske[name]?._errors[0] 
//             }));
//         } else {
//             // Ako je ispravno, obriši grešku za to polje
//             setGreske(prev => ({ ...prev, [name]: undefined }));
//         }
//     };

//     async function dodaj(gradiliste) {
//         const odgovor = await GradilisteService.dodaj(gradiliste);
//         if (odgovor.success) {
//             navigate(RouteNames.GRADILISTE);
//         }
//     }

//     function odradiSubmit(e) {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const podaci = Object.fromEntries(formData.entries());

//         const rezultat = gradilisteSchema.safeParse(podaci);

//         if (!rezultat.success) {
//             const noveGreske = {};
//             // Mapiranje svih grešaka ako korisnik klikne submit bez unosa
//             rezultat.error.errors.forEach(err => {
//                 noveGreske[err.path[0]] = err.message;
//             });
//             setGreske(noveGreske);
//             return;
//         }

//         dodaj(rezultat.data);
//     }

//     return (
//         <>
//             <h3>Unos novog gradilišta</h3>
//             <Form onSubmit={odradiSubmit} noValidate>
//                 <Form.Group controlId="naziv" className="mb-3">
//                     <Form.Label>Naziv</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="naziv" 
//                         placeholder="npr. Hotel Central"
//                         isInvalid={!!greske.naziv} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {greske.naziv}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="adresa" className="mb-3">
//                     <Form.Label>Adresa (Ulica i broj)</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="adresa" 
//                         placeholder="npr. Vukovarska 10"
//                         isInvalid={!!greske.adresa} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {greske.adresa}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="mjesto" className="mb-3">
//                     <Form.Label>Mjesto (s poštanskim brojem)</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="mjesto" 
//                         placeholder="npr. 31000 Osijek"
//                         isInvalid={!!greske.mjesto} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {greske.mjesto}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="oib" className="mb-3">
//                     <Form.Label>OIB</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="oib" 
//                         maxLength={11} 
//                         placeholder="11 znamenki"
//                         isInvalid={!!greske.oib} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {greske.oib}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Row className="mt-4">
//                     <Col>
//                         <Link to={RouteNames.GRADILISTE} className="btn btn-danger w-100">
//                             Odustani
//                         </Link>
//                     </Col>
//                     <Col>
//                         <Button type="submit" variant="success" className="w-100">
//                             Dodaj novo gradilište
//                         </Button>
//                     </Col>
//                 </Row>
//             </Form>
//         </>
//     )
// }



import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import GradilisteService from "../../services/gradiliste/GradilistaService"
import { useState } from "react"
import { z } from "zod"

// 1. Definiranje Zod sheme (Ispravna provjera mjesta i OIB-a)
const gradilisteSchema = z.object({
    naziv: z.string().trim().min(2, "Naziv mora imati najmanje 2 znaka"),
    adresa: z.string().trim().min(2, "Adresa mora sadržavati ulicu i broj"),
    mjesto: z.string().trim().regex(/\d{5}/, "Mjesto mora sadržavati poštanski broj (5 znamenki)"),
    oib: z.string().trim()
        .length(11, "OIB mora imati točno 11 znamenki")
        .regex(/^\d+$/, "OIB smije sadržavati samo brojeve")
        .refine((oib) => {
            if (oib.length !== 11) return false;
            let a = 10;
            for (let i = 0; i < 10; i++) {
                a = a + parseInt(oib.substr(i, 1), 10);
                a = a % 10;
                if (a === 0) a = 10;
                a *= 2;
                a = a % 11;
            }
            let kontrolni = 11 - a;
            if (kontrolni === 10) kontrolni = 0;
            return kontrolni === parseInt(oib.substr(10, 1), 10);
        }, "OIB nije matematički ispravan")
});

export default function GradilisteNovi() {
    const navigate = useNavigate();
    const [greske, setGreske] = useState({});

    // Kontrola u stvarnom vremenu
    const handleChange = (e) => {
        const { name, value } = e.target;
        const poljeSchema = gradilisteSchema.pick({ [name]: true });
        const rezultat = poljeSchema.safeParse({ [name]: value });

        if (!rezultat.success) {
            const formatirano = rezultat.error.format();
            setGreske(prev => ({ ...prev, [name]: formatirano[name]?._errors[0] }));
        } else {
            setGreske(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Popravljena funkcija za dodavanje (bez provjere .success ako servis to ne vraća)
    async function dodaj(gradiliste) {
        await GradilisteService.dodaj(gradiliste);
        navigate(RouteNames.GRADILISTE);
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const podaci = Object.fromEntries(formData.entries());

        const rezultat = gradilisteSchema.safeParse(podaci);

        if (!rezultat.success) {
            const noveGreske = {};
            rezultat.error.errors.forEach(err => {
                noveGreske[err.path[0]] = err.message;
            });
            setGreske(noveGreske);
            return;
        }

        dodaj(rezultat.data);
    }

    return (
        <>
            <h3>Unos novog gradilišta</h3>
            <Form onSubmit={odradiSubmit} noValidate>
                <Form.Group controlId="naziv" className="mb-3">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="naziv" 
                        isInvalid={!!greske.naziv} 
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{greske.naziv}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="adresa" className="mb-3">
                    <Form.Label>Adresa (Ulica i broj)</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="adresa" 
                        isInvalid={!!greske.adresa} 
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{greske.adresa}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="mjesto" className="mb-3">
                    <Form.Label>Mjesto (s poštanskim brojem)</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="mjesto" 
                        isInvalid={!!greske.mjesto} 
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{greske.mjesto}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="oib" className="mb-3">
                    <Form.Label>OIB</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="oib" 
                        maxLength={11} 
                        isInvalid={!!greske.oib} 
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">{greske.oib}</Form.Control.Feedback>
                </Form.Group>

                <Row className="mt-4">
                    <Col>
                        <Link to={RouteNames.GRADILISTE} className="btn btn-danger w-100">Odustani</Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success" className="w-100">Dodaj novo gradilište</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
