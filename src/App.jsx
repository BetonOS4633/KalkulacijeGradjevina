

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container, Row, Col } from 'react-bootstrap'
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

import GradilistePregled from './pages/gradiliste/GradilistePregled'
import GradilisteNovi from './pages/gradiliste/GradilisteNovi'
import GradilistePromjena from './pages/gradiliste/GradilistePromjena'

import PoduzecePregled from './pages/poduzece/PoduzecePregled'
import PoduzeceNovi from './pages/poduzece/PoduzeceNovi'
import PoduzecePromjena from './pages/poduzece/PoduzecePromjena'

import NalogPregled from './pages/nalog/NalogPregled'
import NalogNovi from './pages/nalog/NalogNovi'
import NalogPromjena from './pages/nalog/NalogPromjena'
import StavkaPregled from './pages/nalog/stavka/StavkaPregled'
import StavkaNovi from './pages/nalog/stavka/StavkaNovi'
import StavkaPromjena from './pages/nalog/stavka/StavkaPromjena'

// 1. Uvezi sliku (provjeri putanju do assets mape)
import logoBetonOs from './assets/BetonOs.jpg'

function App() {

  return ( 
    <Container style={ {backgroundColor: window.location.hostname === 'localhost' ? '#ffefea' : 'none', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Izbornik/>
      
      <Container className='app flex-grow-1'>
        <Routes>
          <Route path={RouteNames.HOME} element={<Home />} />
          <Route path={RouteNames.STROJEVI} element={<StrojPregled />} />
          <Route path={RouteNames.STROJEVI_NOVI} element={<StrojNovi />}/>
          <Route path={RouteNames.STROJEVI_PROMJENA} element={<StrojPromjena />}/>
          <Route path={RouteNames.RADNICI} element={<RadnikPregled />} />
          <Route path={RouteNames.RADNICI_NOVI} element={<RadnikNovi />} />
          <Route path={RouteNames.RADNICI_PROMJENA} element={<RadnikPromjena />} />
          <Route path={RouteNames.GRADILISTE} element={<GradilistePregled />} />
          <Route path={RouteNames.GRADILISTE_NOVI} element={<GradilisteNovi />} />
          <Route path={RouteNames.GRADILISTE_PROMJENA} element={<GradilistePromjena />} />
          <Route path={RouteNames.PODUZECE} element={<PoduzecePregled />} />
          <Route path={RouteNames.PODUZECE_NOVI} element={<PoduzeceNovi />} />
          <Route path={RouteNames.PODUZECE_PROMJENA} element={<PoduzecePromjena />} />
          <Route path={RouteNames.NALOG} element={<NalogPregled />} />
          <Route path={RouteNames.NALOG_NOVI} element={<NalogNovi />} />
          <Route path={RouteNames.NALOG_PROMJENA} element={<NalogPromjena />} />
          <Route path={RouteNames.NALOG_STAVKE} element={<StavkaPregled />} />
          <Route path={RouteNames.NALOG_STAVKE_NOVA} element={<StavkaNovi />} />
          <Route path={RouteNames.NALOG_STAVKE_PROMJENA} element={<StavkaPromjena />} />
        </Routes>
      </Container>

      {/* 2. Footer sekcija */}
      <footer className="mt-auto py-3">
        <hr />
        <Row className="align-items-center">
          <Col className="text-center">
            <img 
              src={logoBetonOs} 
              alt="BetonOs Logo" 
              style={{ height: '40px', width: 'auto', marginBottom: '10px' }} 
            />
            <p className="text-muted">
              &copy; {new Date().getFullYear()} BetonOS
            </p>
          </Col>
        </Row>
      </footer>
    </Container>
  )
}

export default App
