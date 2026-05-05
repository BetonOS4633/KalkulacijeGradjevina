import { z } from "zod"

// 1. Definiranje Zod sheme (Ispravna provjera mjesta i OIB-a)
export const GradilisteSchema = z.object({
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
