import {React} from 'react'
import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import Map from './components/Map'
import testData from './constants/testData'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/map-test' element={
          <Map
            nearbyDrivers={testData}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;
