import { IME_APLIKACIJE } from "../constants"

import slika from '../assets/slika1.jpg'





export default function Home() {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <img src={slika} 
                style={{width: '500px', height: 'auto'}} />

            </div>
            <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>
            
        </>
    )
}


