import StrojServiceLocalStorage from "./StrojServiceLocalStorage";
import StrojServiceMemorija from "./StrojServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;


switch (DATA_SOURCE) {
    case 'memorija':
        Servis = StrojServiceMemorija;
        break;
    case 'localStorage':
        Servis = StrojServiceLocalStorage;
        break;
    default:
        Servis = null;
}


const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (stroj) => { console.error("Stroj nije učitan"); },
    promjeni: async (sifra, stroj) => { console.error("Stroj nije učitan"); },
    obrisi: async (sifra) => { console.error("Stroj nije učitan"); }
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (stroj) => AktivniServis.dodaj(stroj),
    promjeni: (sifra, stroj) => AktivniServis.promjeni(sifra, stroj),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};