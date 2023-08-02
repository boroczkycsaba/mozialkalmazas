import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { QueryClientProvider,QueryClient } from 'react-query'
import { Header } from './components/Header'
import { Trendings } from './components/Trendings'
import { MoviesPage } from './components/MoviesPage'
import { SeriesPage } from './components/SeriesPage'
import { BottomNav } from './components/BottomNav'
import { SearchPage } from './components/SearchPage'

const queryClient = new QueryClient()

function App() {
  

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="app">
          <Routes>
            <Route path="/" element={<Trendings />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          
        </div>
        <BottomNav />
      </QueryClientProvider>
    </BrowserRouter>

  )
}

export default App
