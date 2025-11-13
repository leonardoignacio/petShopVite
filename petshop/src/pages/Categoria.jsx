import React, { useEffect, useState } from 'react';
import { Route, useParams, useMatch, Link, Routes } from 'react-router-dom';
import { busca } from '@api/api';
import '@assets/css/blog.css';

import ListaCategorias from '@components/ListaCategorias';
import SubCategoria from '@pages/SubCategoria';
import ListaPost from '@components/ListaPost';

const Categoria = () => {
  const { id } = useParams();
  const match = useMatch('/categoria/:id/*'); 
  const path = match?.pathnameBase || `/categoria/${id}`;
  //const url = match?.pathname || `/categoria/${id}`;
  const [subcategorias, setSubCategorias] = useState([]);

  useEffect(() => {
    busca(`/categorias/${id}`, (categoria) => {
      setSubCategorias(categoria.subcategorias);
    });
  }, [id]);

  return (
    <>
      <div className="container">
        <h2 className="titulo-pagina">Pet Notícias</h2>
      </div>
      <ListaCategorias />
      <ul className="lista-categorias container flex">
        {subcategorias.map((subcategoria) => (
          <li
            className={`lista-categorias__categoria lista-categorias__categoria--${id}`}
            key={subcategoria}
          >
            <Link to={`${path}/${subcategoria}`}>
              {subcategoria}
            </Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path="/" element={<ListaPost url={`/posts?categoria=${id}`} />} />
        <Route path=":subcategoria" element={<SubCategoria />} />
      </Routes>
    </>
  );
};

export default Categoria;
