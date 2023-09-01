import {Routes , Route} from 'react-router-dom'
import Lobby from './screens/lobby.jsx'
import Ready from './screens/LocalUser.jsx'
import './index.css'

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Lobby/>} />
        <Route path={`/room/:roomId`} element={<Ready />} />
        <Route path={`/room/`} element={<Ready />} />
      </Routes>
    </div>  
  )
}

export default App
