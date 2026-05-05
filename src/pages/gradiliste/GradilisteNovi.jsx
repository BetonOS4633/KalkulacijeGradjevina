
// import { Button, Col, Form, Row } from "react-bootstrap"
// import { RouteNames } from "../../constants"
// import { Link, useNavigate } from "react-router-dom"
// import GradilisteService from "../../services/gradiliste/GradilistaService"
// import { useState } from "react"
// import { z } from "zod"

// // 1. Definiranje Zod sheme (Ispravna provjera mjesta i OIB-a)
// const gradilisteSchema = z.object({
//     naziv: z.string().trim().min(2, "Naziv mora imati najmanje 2 znaka"),
//     adresa: z.string().trim().min(2, "Adresa mora sadržavati ulicu i broj"),
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
//     const [greske, setGreske] = useState({});

//     // Kontrola u stvarnom vremenu
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const poljeSchema = gradilisteSchema.pick({ [name]: true });
//         const rezultat = poljeSchema.safeParse({ [name]: value });

//         if (!rezultat.success) {
//             const formatirano = rezultat.error.format();
//             setGreske(prev => ({ ...prev, [name]: formatirano[name]?._errors[0] }));
//         } else {
//             setGreske(prev => ({ ...prev, [name]: undefined }));
//         }
//     };

//     // Popravljena funkcija za dodavanje (bez provjere .success ako servis to ne vraća)
//     async function dodaj(gradiliste) {
//         await GradilisteService.dodaj(gradiliste);
//         navigate(RouteNames.GRADILISTE);
//     }

//     function odradiSubmit(e) {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const podaci = Object.fromEntries(formData.entries());

//         const rezultat = gradilisteSchema.safeParse(podaci);

//         if (!rezultat.success) {
//             const noveGreske = {};
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
//                         isInvalid={!!greske.naziv} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">{greske.naziv}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="adresa" className="mb-3">
//                     <Form.Label>Adresa (Ulica i broj)</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="adresa" 
//                         isInvalid={!!greske.adresa} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">{greske.adresa}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="mjesto" className="mb-3">
//                     <Form.Label>Mjesto (s poštanskim brojem)</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="mjesto" 
//                         isInvalid={!!greske.mjesto} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">{greske.mjesto}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="oib" className="mb-3">
//                     <Form.Label>OIB</Form.Label>
//                     <Form.Control 
//                         type="text" 
//                         name="oib" 
//                         maxLength={11} 
//                         isInvalid={!!greske.oib} 
//                         onChange={handleChange}
//                     />
//                     <Form.Control.Feedback type="invalid">{greske.oib}</Form.Control.Feedback>
//                 </Form.Group>

//                 <Row className="mt-4">
//                     <Col>
//                         <Link to={RouteNames.GRADILISTE} className="btn btn-danger w-100">Odustani</Link>
//                     </Col>
//                     <Col>
//                         <Button type="submit" variant="success" className="w-100">Dodaj novo gradilište</Button>
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

// 1. Definiranje Zod sheme s novim pravilom za mjesto
const gradilisteSchema = z.object({
    naziv: z.string().trim().min(2, "Naziv mora imati najmanje 2 znaka"),
    adresa: z.string().trim().min(2, "Adresa mora sadržavati ulicu i broj"),
    // Regex: najmanje 4 broja (\d{4,}), razmak (\s), naziv mjesta najmanje 2 znaka (.{2,})
    mjesto: z.string().trim().regex(/^\d{4,}\s.{2,}$/, "Mjesto mora biti u formatu: poštanski broj (min. 4 znamenke) razmak naziv mjesta (min. 2 znaka)"),
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

    async function dodaj(gradiliste) {
        try {
            await GradilisteService.dodaj(gradiliste);
            navigate(RouteNames.GRADILISTE);
        } catch (e) {
            console.error(e);
            alert("Došlo je do pogreške prilikom spremanja.");
        }
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
                        placeholder="npr. Stambena zgrada A"
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
                        placeholder="npr. Ilica 10"
                    />
                    <Form.Control.Feedback type="invalid">{greske.adresa}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="mjesto" className="mb-3">
                    <Form.Label>Mjesto (Poštanski broj i naziv)</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="mjesto" 
                        isInvalid={!!greske.mjesto} 
                        onChange={handleChange}
                        placeholder="npr. 31000 Osijek"
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
                        placeholder="11 znamenki"
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

