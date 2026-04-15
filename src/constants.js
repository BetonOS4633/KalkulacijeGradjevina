import { poduzeca } from "./services/poduzece/PoduzecePodaci";  
import { radnici } from "./services/radnici/RadnikPodaci";
import { strojevi } from "./services/strojevi/StrojPodaci";
import { gradilista } from "./services/gradiliste/GradilistaPodaci";
import { nalog } from "./services/nalog/NalogPodaci";

export const IME_APLIKACIJE='BetonOS'

export const RouteNames={
    HOME:'/',
    
    STROJEVI:'/strojevi',// ovo je ruta, a ne link
    STROJEVI_NOVI:'/strojevi/novi',
    STROJEVI_PROMJENA: '/strojevi/:sifra',

    RADNICI:'/radnici',
    RADNICI_NOVI:'/radnici/novi',
    RADNICI_PROMJENA: '/radnici/:sifra',

    GRADILISTE:'/gradiliste',
    GRADILISTE_NOVI:'/gradiliste/novi',
    GRADILISTE_PROMJENA: '/gradiliste/:sifra',

    PODUZECE:'/poduzece',
    PODUZECE_NOVI:'/poduzece/novi',
    PODUZECE_PROMJENA: '/poduzece/:sifra',

    NALOG:'/nalog',
    NALOG_NOVI:'/nalog/novi',
    NALOG_PROMJENA: '/nalog/:sifra'
    




}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'memorija';