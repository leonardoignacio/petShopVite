import React from 'react'
import Home from '@pages/Home'
import Sobre from '@pages/Sobre'
import Pagina404 from '@pages/Pagina404'
import Post from '@pages/Post'
import Categoria from '@pages/Categoria'
import Cabecalho from '@components/cabecalho'
import '@assets/css/base/base.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from '@pages/admin/Admin'
import FormCategoria from '@admin/components/FormCategoria'
import FormSubCategoria from '@admin/components/FormSubCategoria'
import FormPost from '@admin/components/FormPost'
import CatAdmin from '@admin/CatAdmin'
import PostAdmin from '@admin/PostAdmin'
function App() {


  return (
    <Router>
      <Cabecalho></Cabecalho>
      <Routes>
      {/* Rotas Navegação */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/categoria/:id/*" element={<Categoria />} />
        
      {/* Rotas Admin */}
        <Route index path="/admin" element={<Admin />} />
      { /* Categoria */}
        <Route path="/admin/NovaCategoria" element={<FormCategoria />} />
        <Route path="/admin/categoria/:id" element={<FormCategoria />} />
      { /* SubCategoria */}
        <Route path="/admin/form/categoria/:id" element={<CatAdmin />} />
        <Route path="/admin/sub/:id" element={<FormSubCategoria />} />
        
      { /* Posts */}
        <Route path="posts" element={<PostAdmin />} />
        <Route path="/admin/posts/NovoPost" element={<FormPost />} />
        <Route path="/admin/posts/NovoPost/:id" element={<FormPost />} />
        
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </Router>
  )
}

export default App
