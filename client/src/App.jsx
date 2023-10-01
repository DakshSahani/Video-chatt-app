import {Routes , Route} from 'react-router-dom'
import {SocketIoProvider} from './context/useSocket'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Lobby from './screens/lobby.jsx'
import Ready from './screens/LocalUser.jsx'
import Auth from './auth/Auth'
import './index.css'

function App() {

  return (
    <div className="text-white bg-slate-900">
      <Routes>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={
          <Auth>
            <SocketIoProvider>
              <Lobby/>
            </SocketIoProvider>
          </Auth>
        }/>
        <Route path={`/room/:roomId`} element={
          <Auth>
            <SocketIoProvider>
              <Ready />
            </SocketIoProvider>
          </Auth>
        }/>
        <Route path={`/room/`} element={<Ready />} />
      </Routes>
    </div>  
  )
}

export default App
