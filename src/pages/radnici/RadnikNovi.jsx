

import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate } from "react-router-dom"
import RadnikService from "../../services/radnici/RadnikService"
import { useState } from "react"
import { z } from "zod"

// 1. Definiranje Zod sheme s pravilima za Radnika
const radnikSchema = z.object({
    ime: z.string().trim()
        .min(2, "Ime mora imati najmanje 2 znaka")
        .regex(/^[A-ZČĆŽŠĐ].*$/, "Ime mora početi velikim slovom"),
    prezime: z.string().trim()
        .min(2, "Prezime mora imati najmanje 2 znaka")
        .regex(/^[A-ZČĆŽŠĐ].*$/, "Prezime mora početi velikim slovom"),
    email: z.string().trim()
        .email("Niste unijeli ispravan email format"),
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

export default function RadnikNovi() {
    const navigate = useNavigate();
    const [greske, setGreske] = useState({});

    // Kontrola u stvarnom vremenu
    const handleChange = (e) => {
        const { name, value } = e.target;
        const poljeSchema = radnikSchema.pick({ [name]: true });
        const rezultat = poljeSchema.safeParse({ [name]: value });

        if (!rezultat.success) {
            const formatirano = rezultat.error.format();
            setGreske(prev => ({ ...prev, [name]: formatirano[name]?._errors[0] }));
        } else {
            setGreske(prev => ({ ...prev, [name]: undefined }));
        }
    };

    async function dodaj(radnik) {
        try {
            await RadnikService.dodaj(radnik);
            navigate(RouteNames.RADNICI);
        } catch (e) {
            console.error(e);
            alert("Došlo je do greške kod spremanja na server.");
        }
    }

    function odradiSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const podaci = Object.fromEntries(formData.entries());

        const rezultat = radnikSchema.safeParse(podaci);

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
            <h3>Unos novog radnika</h3>
            <Form onSubmit={odradiSubmit} noValidate>
                <Form.Group controlId="ime" className="mb-3">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="ime" 
                        isInvalid={!!greske.ime} 
                        onChange={handleChange}
                        placeholder="npr. Ivan"
                    />
                    <Form.Control.Feedback type="invalid">{greske.ime}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="prezime" className="mb-3">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="prezime" 
                        isInvalid={!!greske.prezime} 
                        onChange={handleChange}
                        placeholder="npr. Horvat"
                    />
                    <Form.Control.Feedback type="invalid">{greske.prezime}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        isInvalid={!!greske.email} 
                        onChange={handleChange}
                        placeholder="ime.prezime@primjer.hr"
                    />
                    <Form.Control.Feedback type="invalid">{greske.email}</Form.Control.Feedback>
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
                        <Link to={RouteNames.RADNICI} className="btn btn-danger w-100">Odustani</Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success" className="w-100">Dodaj novog radnika</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
