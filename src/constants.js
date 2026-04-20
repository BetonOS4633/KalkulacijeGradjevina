
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
    NALOG_PROMJENA: '/nalog/:sifra',
    
    STAVKA:'/stavka',
    STAVKA_NOVI:'/stavka/novi',
    STAVKA_PROMJENA: '/stavka/:sifra'




}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'memorija';