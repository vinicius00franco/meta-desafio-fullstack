import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { ContainerNotificacoes } from '@/components/organismos/ContainerNotificacoes'
import '@/styles/reset.css'
import '@/styles/variaveis.css'
import App from '@/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ContainerNotificacoes />
      <App />
    </Provider>
  </StrictMode>,
)
