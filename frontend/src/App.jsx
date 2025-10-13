import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import './index.css'
import { AppProvider } from './context/AppContext'

function App(){
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-container">
          <Router />
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
