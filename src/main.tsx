import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from '../src/Redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { persister } from '../src/Redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persister}>
        <App />
        </PersistGate>
    </Provider>
  </StrictMode>
)
