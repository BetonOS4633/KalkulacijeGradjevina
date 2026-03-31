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
      </Routes>
      </Container>
      <hr />
    &copy; BetonOS
    </Container>
  )
}

export default App
