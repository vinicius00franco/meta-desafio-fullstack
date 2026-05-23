import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import { ContainerNotificacoes } from './components/organisms/ContainerNotificacoes'
import './styles/reset.css'
import './styles/variaveis.css'
import { Checkout } from './pages/Checkout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ContainerNotificacoes />
      <Checkout />
    </Provider>
  </StrictMode>,
)
