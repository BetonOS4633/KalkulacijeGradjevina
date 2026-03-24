import { strojevi } from "./StrojPodaci";

// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{data:strojevi}
}


async function dodaj(stroj) {
    if(strojevi.length>0){
    stroj.sifra=strojevi[strojevi.length-1].sifra+1;
    }else{
        stroj.sifra=1
    }

    strojevi.push(stroj);
}

export default {
    get,
    dodaj
}
