import'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'

import StrojPregled from './pages/strojevi/StrojPregled'
import StrojNovi from './pages/strojevi/StrojNovi'
import StrojPromjena from './pages/strojevi/StrojPromjena'


import RadnikPregled from './pages/radnici/RadnikPregled'
import RadnikNovi from './pages/radnici/RadnikNovi'
import RadnikPromjena from './pages/radnici/RadnikPromjena'




function App() {


  return ( 
    <Container style={ {backgroundColor: window.location.hostname === 'localhost' ? '#ffefea' : 'none'}}>
      <Izbornik/>
    <Container className='app'>
      <Routes>
        <Route path={RouteNames.HOME} element={<Home />} />

        <Route path={RouteNames.STROJEVI} element={<StrojPregled />} />
        <Route path={RouteNames.STROJEVI_NOVI} element={<StrojNovi />}/>
        <Route path={RouteNames.STROJEVI_PROMJENA} element={<StrojPromjena />}/>
    
        <Route path={RouteNames.RADNICI} element={<RadnikPregled />} />
        <Route path={RouteNames.RADNICI_NOVI} element={<RadnikNovi />} />
        <Route path={RouteNames.RADNICI_PROMJENA} element={<RadnikPromjena />} />

        {/* <Route path={RouteNames.NALOZI} element={<NalogPregled />} />
        <Route path={RouteNames.NALOZI_NOVI} element={<NalogNovi />} />
        <Route path={RouteNames.NALOZI_PROMJENA} element={<NalogPromjena />} /> */}

        {/* <Route path={RouteNames.POSLOVI} element={<PosaoPregled />} />
        <Route path={RouteNames.POSLOVI_NOVI} element={<PosaoNovi />} />
        <Route path={RouteNames.POSLOVI_PROMJENA} element={<PosaoPromjena />} /> */}

         
    
    
      </Routes>
      </Container>
      <hr />
    &copy; BetonOS
    </Container>
  )
}

export default App
