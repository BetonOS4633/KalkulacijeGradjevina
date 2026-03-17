import { strojevi } from "./StrojPodaci";

// 1/4 Read od CRUD-a - Create, Read, Update, Delete
async function get() {
    return{data:strojevi}
}


export default {
    get
}
