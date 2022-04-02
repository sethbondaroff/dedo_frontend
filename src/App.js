import React, {useState, useEffect} from 'react'
import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom'
import Login from './components/Login'
import Map from './components/Map'

const App = () => {

  const [source, setSource] = useState([])
  const [destination, setDestination] = useState([])

  useEffect(() => {
    console.log(`Source: [${source[0]}, ${source[1]}], Dest: [${destination[0]}, ${destination[1]}]`)
  },[source, destination])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/map-test' element={
          <Map
            setSourceCoords={setSource}
            setDestCoords={setDestination}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;
