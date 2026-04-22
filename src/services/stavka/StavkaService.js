// import StavkaServiceLocalStorage from "./StavkaServiceLocalStorage";
// import StavkaServiceMemorija from "./StavkaServiceMemorija";
// import { DATA_SOURCE } from "../../constants";

// let Servis = null;

// switch (DATA_SOURCE) {
//     case 'memorija':
//         Servis = StavkaServiceMemorija;
//         break;
//     case 'localStorage':
//         Servis = StavkaServiceLocalStorage;
//         break;
//     default:
//         Servis = null;
// }

// const PrazanServis = {
//     get: async () => ({ success: false, data: []}),
//     getBySifra: async (sifra) => ({ success: false, data: {} }),
//     dodaj: async (stavka) => { console.error("Stavka nije učitana"); },
//     promjeni: async (sifra, stavka) => { console.error("Stavka nije učitana"); },
//     obrisi: async (sifra) => { console.error("Stavka nije učitana"); }
// };

// const AktivniServis = Servis || PrazanServis;

// export default {
//     get: () => AktivniServis.get(),
    
//     // Ključna funkcija za filtriranje stavki prema nalogu
//     getPoNalogu: async (sifraNaloga) => {
//         const odgovor = await AktivniServis.get();
//         if (odgovor.success) {
//             // Koristimo == jer je sifraNaloga iz URL-a string, a s.nalog je broj
//             const filtrirane = odgovor.data.filter(s => s.nalog == sifraNaloga);
//             return { success: true, data: filtrirane };
//         }
//         return odgovor;
//     },

//     getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
//     dodaj: (stavka) => AktivniServis.dodaj(stavka),
//     promjeni: (sifra, stavka) => AktivniServis.promjeni(sifra, stavka),
//     obrisi: (sifra) => AktivniServis.obrisi(sifra)
// };


import StavkaServiceLocalStorage from "./StavkaServiceLocalStorage";
import StavkaServiceMemorija from "./StavkaServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

switch (DATA_SOURCE) {
    case 'memorija':
        Servis = StavkaServiceMemorija;
        break;
    case 'localStorage':
        Servis = StavkaServiceLocalStorage;
        break;
    default:
        Servis = null;
}

const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (stavka) => { console.error("Stavka nije učitana"); },
    promjeni: async (sifra, stavka) => { console.error("Stavka nije učitana"); },
    obrisi: async (sifra) => { console.error("Stavka nije učitana"); }
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    
    getPoNalogu: async (sifraNaloga) => {
        const odgovor = await AktivniServis.get();
        if (odgovor.success) {
            // Koristimo tvoj ključ 'nalog' za filtriranje
            const filtrirane = odgovor.data.filter(s => s.nalog === Number(sifraNaloga));
            return { success: true, data: filtrirane };
        }
        return odgovor;
    },

    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (stavka) => AktivniServis.dodaj(stavka),
    promjeni: (sifra, stavka) => AktivniServis.promjeni(sifra, stavka),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};
