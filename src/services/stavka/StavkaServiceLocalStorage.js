const STORAGE_KEY = 'stavka';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const stavke = dohvatiSveIzStorage();
    return {success: true,  data: [...stavke] };
}

async function getBySifra(sifra) {
    const stavke = dohvatiSveIzStorage();
    const stavka = stavke.find(s => s.sifra === parseInt(sifra));
    return {success: true,  data: stavka ? stavka : null };
}

async function dodaj(stavka) {
    const stavke = dohvatiSveIzStorage();
    
    if (stavke.length === 0) {
        stavka.sifra = 1;
    } else {
        const maxSifra = Math.max(...stavke.map(s => s.sifra));
        stavka.sifra = maxSifra + 1;
    }
    
    stavke.push(stavka);
    spremiUStorage(stavke);
    return { data: stavka};
}

async function promjeni(sifra, stavka) {
    const stavke = dohvatiSveIzStorage();
    const index = stavke.findIndex(s => s.sifra === parseInt(sifra));
    
    if (index !== -1) {
        strojevi[index] = { ...stavke[index], ...stavka};
        spremiUStorage(stavke);
    }
    return { data: stavke[index] };
}

async function obrisi(sifra) {
    let stavke = dohvatiSveIzStorage();
    stavke = ststavke.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(stavke);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
