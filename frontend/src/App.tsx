import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Create } from './pages/Create'
import { Archive } from './pages/Archive'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="archive" element={<Archive />} />
      </Route>
    </Routes>
  )
}