import { poduzeca } from "./services/poduzece/PoduzecePodaci";  

export const IME_APLIKACIJE='BetonOS'

export const RouteNames={
    HOME:'/',
    
    STROJEVI:'/strojevi',// ovoje ruta, a ne link
    STROJEVI_NOVI:'/strojevi/novi',
    STROJEVI_PROMJENA: '/strojevi/:sifra',

    RADNICI:'/radnici',
    RADNICI_NOVI:'/radnici/novi',
    RADNICI_PROMJENA: '/radnici/:sifra',

    GRADILISTE:'/gradiliste',
    GRADILISTE_NOVI:'/gradiliste/novi',
    GRADILISTE_PROMJENA: '/gradiliste/:sifra',

    PODUZECA:'/poduzece',
    PODUZECA_NOVI:'/poduzece/novi',
    PODUZECA_PROMJENA: '/poduzece/:sifra'






}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'localStorage';