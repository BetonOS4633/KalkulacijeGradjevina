import { stavke } from "./StavkaPodaci";


// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{data:[...stavke]}
}

async function getBySifra(sifra) {
   return {data: stavke.find(s => s.sifra === parseInt(sifra))} 
}

// 2/4 Create CRUD
async function dodaj(stavka) {
    if(stavke.length>0){
    stroj.sifra=stavke[stavke.length-1].sifra+1;
    }else{
        stavka.sifra=1
    }

    stavke.push(stavka);
}

// 3/4 Update od CRUD
async function promjeni(sifra,stavka) {
    const index = nadiIndex(sifra)
    stavke[index] = {...stavke[index], ...stavka}
}

function nadiIndex(sifra){
    return stavke.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        stavke.splice(index, 1);
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