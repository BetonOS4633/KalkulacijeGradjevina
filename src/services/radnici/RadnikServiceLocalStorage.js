const STORAGE_KEY = 'radnici';

// Pomoćna funkcija za dohvaćanje podataka iz local storage-a
function dohvatiSveIzStorage() {
    const podaci = localStorage.getItem(STORAGE_KEY);
    return podaci ? JSON.parse(podaci) : [];
}

// Pomoćna funkcija za spremanje podataka
function spremiUStorage(podaci) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(podaci));
}

// 1/4 Read - dohvati sve
async function get() {
    const radnici = dohvatiSveIzStorage();
    return {success: true,  data: [...radnici] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const radnici = dohvatiSveIzStorage();
    const radnik = radnici.find(r => r.sifra === parseInt(sifra));
    return {success: true,  data: radnik };
}

// 2/4 Create - dodaj novi
async function dodaj(radnik) {
    const radnici = dohvatiSveIzStorage();
    
    if (radnici.length === 0) {
        radnik.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...radnici.map(r => r.sifra));
        radnik.sifra = maxSifra + 1;
    }
    
    radnici.push(radnik);
    spremiUStorage(radnici);
    return { data: radnik };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, radnik) {
    const radnici = dohvatiSveIzStorage();
    const index = radnici.findIndex(r => r.sifra === parseInt(sifra));
    
    if (index !== -1) {
        radnici[index] = { ...radnici[index], ...radnik };
        spremiUStorage(radnici);
    }
    return { data: radnici[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let radnici = dohvatiSveIzStorage();
    radnici = radnici.filter(r => r.sifra !== parseInt(sifra));
    spremiUStorage(radnici);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
