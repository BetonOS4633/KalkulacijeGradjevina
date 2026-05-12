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
    const gradilista = dohvatiSveIzStorage();
    return {success: true,  data: [...gradilista] };
}

// Dohvati jedan po šifri
async function getBySifra(sifra) {
    const gradilista = dohvatiSveIzStorage();
    const gradiliste = gradilista.find(g => g.sifra === parseInt(sifra));
    return {success: true,  data: gradiliste };
}

// 2/4 Create - dodaj novi
async function dodaj(gradiliste) {
    const gradilista = dohvatiSveIzStorage();
    
    if (gradilista.length === 0) {
        gradiliste.sifra = 1;
    } else {
        // Pronalaženje najveće šifre da izbjegnemo duplikate
        const maxSifra = Math.max(...gradilista.map(g => g.sifra));
        gradiliste.sifra = maxSifra + 1;
    }
    
    gradilista.push(gradiliste);
    spremiUStorage(gradilista);
    return { data: gradiliste };
}

// 3/4 Update - promjeni postojeći
async function promjeni(sifra, gradiliste) {
    const gradilista = dohvatiSveIzStorage();
    const index = gradilista.findIndex(g => g.sifra === parseInt(sifra));
    
    if (index !== -1) {
        gradilista[index] = { ...gradilista[index], ...gradiliste };
        spremiUStorage(gradilista);
    }
    return { data: gradilista[index] };
}

// 4/4 Delete - obriši
async function obrisi(sifra) {
    let gradilista = dohvatiSveIzStorage();
    gradilista = gradilista.filter(g => g.sifra !== parseInt(sifra));
    spremiUStorage(gradilista);
    return { message: 'Obrisano' };
}

export default {
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
};
