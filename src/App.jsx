import'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Izbornik from './components/Izbornik'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Home from './pages/Home'
import StrojPregled from './pages/stroj/StrojPregled'


function App() {

  return ( 
    <Container>
      <Izbornik></Izbornik>
    <Routes>
      <Route path={RouteNames.HOME} element={<Home />} />
      <Route path={RouteNames.STROJEVI} element={<StrojPregled />} />
    </Routes>


    <hr />
    &copy; BetonOS
    </Container>
  )
}

export default App
