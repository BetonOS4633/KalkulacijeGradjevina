const STORAGE_KEY = 'nalog';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const nalozi = dohvatiSveIzStorage();
    return {success: true,  data: [...nalozi] };
}

async function getBySifra(sifra) {
    const nalozi = dohvatiSveIzStorage();
    const nalog = strojevi.find(s => s.sifra === parseInt(sifra));
    return {success: true,  data: nalog ? nalog : null };
}

async function dodaj(nalog) {
    const nalozi = dohvatiSveIzStorage();
    
    if (nalozi.length === 0) {
        nalog.sifra = 1;
    } else {
        const maxSifra = Math.max(...nalozi.map(s => s.sifra));
        stroj.sifra = maxSifra + 1;
    }
    
    strojevi.push(nalog);
    spremiUStorage(nalozi);
    return { data: nalog };
}

async function promjeni(sifra, nalog) {
    const nalozi = dohvatiSveIzStorage();
    const index = nalozi.findIndex(s => s.sifra === parseInt(sifra));
    
    if (index !== -1) {
        nalozi[index] = { ...nalozi[index], ...nalog};
        spremiUStorage(nalozi);
    }
    return { data: nalozi[index] };
}

async function obrisi(sifra) {
    let nalozi = dohvatiSveIzStorage();
    nalozi = nalozi.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(nalozi);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
