import {React} from 'react'
import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import Map from './components/Map'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/map-test' element={<Map/>}/>
      </Routes>
    </div>
  );
}

export default App;
