const STORAGE_KEY = 'strojevi';

function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

async function get() {
    const strojevi = dohvatiSveIzStorage();
    return {success: true,  data: [...strojevi] };
}

async function getBySifra(sifra) {
    const strojevi = dohvatiSveIzStorage();
    const stroj = strojevi.find(s => s.sifra === parseInt(sifra));
    return {success: true,  data: stroj ? stroj : null };
}

async function dodaj(stroj) {
    const strojevi = dohvatiSveIzStorage();
    
    if (strojevi.length === 0) {
        stroj.sifra = 1;
    } else {
        const maxSifra = Math.max(...strojevi.map(s => s.sifra));
        stroj.sifra = maxSifra + 1;
    }
    
    strojevi.push(stroj);
    spremiUStorage(strojevi);
    return { data: stroj };
}

async function promjeni(sifra, stroj) {
    const strojevi = dohvatiSveIzStorage();
    const index = strojevi.findIndex(s => s.sifra === parseInt(sifra));
    
    if (index !== -1) {
        strojevi[index] = { ...strojevi[index], ...stroj};
        spremiUStorage(strojevi);
    }
    return { data: strojevi[index] };
}

async function obrisi(sifra) {
    let strojevi = dohvatiSveIzStorage();
    strojevi = strojevi.filter(s => s.sifra !== parseInt(sifra));
    spremiUStorage(strojevi);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
