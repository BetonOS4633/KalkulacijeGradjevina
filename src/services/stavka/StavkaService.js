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
    dodaj: async (stroj) => { console.error("Stavka nije učitana"); },
    promjeni: async (sifra, stavka) => { console.error("Stavka nije učitana"); },
    obrisi: async (sifra) => { console.error("Stavka nije učitana"); }
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (stavka) => AktivniServis.dodaj(stavka),
    promjeni: (sifra, stavka) => AktivniServis.promjeni(sifra, stroj),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};