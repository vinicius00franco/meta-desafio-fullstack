import { useEffect } from 'react'
import { Checkout } from '@/pages/Checkout'
import { useAppDispatch } from '@/store/hooks'
import { buscarProdutos } from '@/store/produtoSlice'
import '@/App.css'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(buscarProdutos({ pagina: 1, limite: 10 }))
  }, [dispatch])

  return <Checkout />
}

export default App
