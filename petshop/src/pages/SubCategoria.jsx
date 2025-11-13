import React from 'react';
import { useParams } from 'react-router-dom';
import ListaPost from '@components/ListaPost';

const SubCategoria = () => {
  const { subcategoria } = useParams();

  // Validação defensiva caso o parâmetro não exista
  if (!subcategoria) {
    return <p className="container">Subcategoria não encontrada.</p>;
  }

  return (
    <ListaPost url={`/posts?subcategoria=${subcategoria}`} />
  );
};

export default SubCategoria;