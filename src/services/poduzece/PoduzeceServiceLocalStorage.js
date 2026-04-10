const STORAGE_KEY = 'poduzece';

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
    const poduzece = dohvatiSveIzStorage();
    return {success: true,  data: [...poduzece] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const poduzece = dohvatiSveIzStorage();
    const poduzeceItem = poduzece.find(p => p.sifra === parseInt(sifra));
    return {success: true,  data: poduzeceItem };
}

// 2/4 Create - dodaj novi
async function dodaj(poduzece) {
    const poduzeceList = dohvatiSveIzStorage();
    
    if (poduzeceList.length === 0) {
        poduzece.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...poduzeceList.map(p => p.sifra));
        poduzece.sifra = maxSifra + 1;
    }
    
    poduzeceList.push(poduzece);
    spremiUStorage(poduzeceList);
    return { data: poduzece };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, poduzece) {
    const poduzeceList = dohvatiSveIzStorage();
    const index = poduzeceList.findIndex(p => p.sifra === parseInt(sifra));
    
    if (index !== -1) {
        poduzeceList[index] = { ...poduzeceList[index], ...poduzece };
        spremiUStorage(poduzeceList);
    }
    return { data: poduzeceList[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let poduzeceList = dohvatiSveIzStorage();
    poduzeceList = poduzeceList.filter(p => p.sifra !== parseInt(sifra));
    spremiUStorage(poduzeceList);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
