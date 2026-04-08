import { radnici } from "./RadnikPodaci";


// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...radnici]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: radnici.find(p => p.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(radnik){
    if(radnici.length===0){
        radnik.sifra=1
    }else{
        radnik.sifra = radnici[radnici.length - 1].sifra + 1
    }
    
    radnici.push(radnik)
}

// 3/4 Update od CRUD
async function promjeni(sifra,radnik) {
    const index = nadiIndex(sifra)
    radnici[index] = {...radnici[index], ...radnik}
}

function nadiIndex(sifra){
    return radnici.findIndex(p=>p.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        radnici.splice(index, 1);
    }
    return;
}


export default{
    get,
    dodaj,
    getBySifra,
    promjeni,
    obrisi
}
