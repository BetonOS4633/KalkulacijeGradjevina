import { gradilista} from "./GradilistaPodaci";
    

// 1/4 Read od CRUD
async function get(){
    return {success: true, data: [...gradilista]} // [...] stvara novi niz s istim podacima
}

async function getBySifra(sifra) {
    return {success: true, data: gradilista.find(p => p.sifra === parseInt(sifra))}
}

// 2/4 Create od CRUD
async function dodaj(gradiliste){
    if(gradilista.length===0){
        gradiliste.sifra=1
    }else{
        gradiliste.sifra = gradilista[gradilista.length - 1].sifra + 1
    }
    
    gradilista.push(gradiliste)
}

// 3/4 Update od CRUD
async function promjeni(sifra,gradiliste) {
    const index = nadiIndex(sifra)
    gradilista[index] = {...gradilista[index], ...gradiliste}
}

function nadiIndex(sifra){
    return gradilista.findIndex(p=>p.sifra === parseInt(sifra))
}

// 4/4 Delete od CRUD
async function obrisi(sifra) {
    const index = nadiIndex(sifra);
    if (index > -1) {
        gradilista.splice(index, 1);
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
