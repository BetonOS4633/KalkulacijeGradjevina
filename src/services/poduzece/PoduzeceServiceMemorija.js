import { poduzeca } from "./PoduzecePodaci";


// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...poduzeca]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: poduzeca.find(p => p.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(poduzece){
    if(poduzeca.length===0){
        poduzece.sifra=1
    }else{
        poduzece.sifra = poduzeca[poduzeca.length - 1].sifra + 1
    }
    
    poduzeca.push(poduzece)
}

// 3/4 Update od CRUD
async function promjeni(sifra,poduzece) {
    const index = nadiIndex(sifra)
    poduzeca[index] = {...poduzeca[index], ...poduzece}
}

function nadiIndex(sifra){
    return poduzeca.findIndex(p=>p.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        poduzeca.splice(index, 1);
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
