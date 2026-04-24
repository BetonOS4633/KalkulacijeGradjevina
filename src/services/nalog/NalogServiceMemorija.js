import { nalozi } from "./NalogPodaci";


// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{success: true, data:[...nalozi]}
}

async function getBySifra(sifra) {
   return {success: true, data: nalozi.find(s => s.sifra === parseInt(sifra))} 
}

// 2/4 Create CRUD
async function dodaj(nalog) {
    if(nalozi.length>0){
    nalog.sifra=nalozi[nalozi.length-1].sifra+1;
    }else{
        nalog.sifra=1
    }

    nalozi.push(nalog);
}

// 3/4 Update od CRUD
async function promjeni(sifra,nalog) {
    const index = nadiIndex(sifra)
    nalozi[index] = {...nalozi[index], ...nalog}
}

function nadiIndex(sifra){
    return nalozi.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        nalozi.splice(index, 1);
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