// Datum je tipa podatka string
export default function FormatDatum({datum,prikazZadano='-'}){
    if (!datum){
        return prikazZadano;
    }
    const d=new Date(datum)  // d jje objekt tipa Date
    if(isNaN(d.getTime())){
        return prikazZadano
    }

    return Intl.DateTimeFormat('hr-HR',{
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour:'2-digit',
        minute:'2-digit'
    }).format(d) + (datum.includes('T')?'':'.')
} 