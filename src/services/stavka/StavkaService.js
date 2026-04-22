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
    get: async (nalog) => ({ success: false, data: []}),
    getBySifra: async (sifra) => ({ success: false, data: {} }),
    dodaj: async (stavka) => { console.error("Stavka nije učitana"); },
    promjeni: async (sifra, stavka) => { console.error("Stavka nije učitana"); },
    obrisi: async (sifra) => { console.error("Stavka nije učitana"); }
};

const AktivniServis = Servis || PrazanServis;

export default {
    get: (nalog) => AktivniServis.get(nalog),
    getBySifra: (sifra) => AktivniServis.getBySifra(sifra),
    dodaj: (stavka) => AktivniServis.dodaj(stavka),
    promjeni: (sifra, stavka) => AktivniServis.promjeni(sifra, stavka),
    obrisi: (sifra) => AktivniServis.obrisi(sifra)
};
