import PoduzeceServiceLocalStorage from "./PoduzeceServiceLocalStorage";
import PoduzeceServiceMemorija from "./PoduzeceServiceMemorija";
import { DATA_SOURCE } from "../../constants";

let Servis = null;

// 1. Odabir servisa
switch (DATA_SOURCE) {
    case 'memorija':
        Servis = PoduzeceServiceMemorija;
        break;
    case 'localStorage':
        Servis = PoduzeceServiceLocalStorage;
        break;
    default:
        Servis = null;
}

// 2. Definiranje defaultnog (praznog) ponašanja ako Servis nije pronađen
const PrazanServis = {
    get: async () => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (poduzece) => { console.error("Servis nije učitan"); },
    promjeni: async (sifra, poduzece) => { console.error("Servis nije učitan"); },
    obrisi: async (sifra) => { console.error("Servis nije učitan"); }
};

// 3. Jedan jedini export na kraju
// Ako Servis postoji, koristi njega, inače koristi PrazanServis
const AktivniServis = Servis || PrazanServis;

export default {
    get: () => AktivniServis.get(),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (poduzece) => AktivniServis.dodaj(poduzece),
    promjeni: (sifra, poduzece) => AktivniServis.promjeni(sifra, poduzece),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};
