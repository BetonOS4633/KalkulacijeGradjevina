import { strojevi } from "./StrojPodaci";


// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{success: true, data:[...strojevi]}
}

async function getBySifra(sifra) {
   return {success: true, data: strojevi.find(s => s.sifra === parseInt(sifra))} 
}

// 2/4 Create CRUD
async function dodaj(stroj) {
    if(strojevi.length>0){
    stroj.sifra=strojevi[strojevi.length-1].sifra+1;
    }else{
        stroj.sifra=1
    }

    strojevi.push(stroj);
}

// 3/4 Update od CRUD
async function promjeni(sifra,stroj) {
    const index = nadiIndex(sifra)
    strojevi[index] = {...strojevi[index], ...stroj}
}

function nadiIndex(sifra){
    return strojevi.findIndex(s => s.sifra === parseInt(sifra))
}

async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        strojevi.splice(index, 1);
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