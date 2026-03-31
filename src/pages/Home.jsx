import { IME_APLIKACIJE } from "../constants"

import slika from '../assets/slika1.jpg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'





export default function Home() {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <img src={slika} />

            </div>
            <p className="lead m-5 text-center">Dobrodošli na {IME_APLIKACIJE}</p>
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <DotLottieReact
                    src="/AISpark_InteractiveAssistant.lottie"

                    loop
                    autoplay
                />
            </div>
        </>
    )
}


