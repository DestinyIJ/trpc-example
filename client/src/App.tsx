import { useCallback } from 'react'
import { mainTRPC } from '../lib/client'
import './App.css'

function App() {
  // useCallback(() => {
  //   mainTRPC()
  // }, [])

  mainTRPC()

  return (
    <main>
      <span>Hello World</span>
    </main>
  )
}

export default App
