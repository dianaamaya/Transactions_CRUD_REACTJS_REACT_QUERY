import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { MainTransactions } from './components/MainTransactions'
import { About } from './components/About'
import { NoMatch } from './components/NoMatch'
import { Footer } from './components/Footer'
import { Toaster } from 'react-hot-toast'

export default function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <MainTransactions /> } />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <Toaster />
    </div>
  )
}
