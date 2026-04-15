import NalogServiceLocalStorage from "./NalogServiceLocalStorage";
import NalogServiceMemorija from "./NalogServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
        Servis = NalogServiceMemorija;
        break;
    case 'localStorage':
        Servis = NalogServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (stroj) => { console.error("Nalog nije učitan"); },
    promjeni: async (sifra, stroj) => { console.error("Nalog nije učitan"); },
    obrisi: async (sifra) => { console.error("Nalog nije učitan"); }
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (nalog) => AktivniServis.dodaj(nalog),
    promjeni: (sifra, nalog) => AktivniServis.promjeni(sifra, nalog),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};