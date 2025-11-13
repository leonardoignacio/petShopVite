import React, { useState, useEffect } from "react";
import { busca } from '@api/api';
import { Link } from 'react-router-dom';

const ListaPost = ({ url }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    busca(url, setPosts);
  }, [url]); 

  return (
    <section className="posts container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link
            key={post.id} 
            className={`cartao-post cartao-post--${post.categoria}`}
            to={`/posts/${post.id}`}
          >
            <article>
              <h3 className="cartao-post__titulo">{post.title}</h3>
              <p className="cartao-post__meta">{post.metadescription}</p>
            </article>
          </Link>
        ))
      ) : (
        <p className="container">Nenhum post encontrado.</p>
      )}
    </section>
  );
};

export default ListaPost;
