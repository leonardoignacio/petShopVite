import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { busca } from "../api/api";
import "../assets/css/post.css";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    busca(`/posts/${id}`, (dados) => {
      if (dados?.id) {setPost(dados);
      } else {
        setErro(true);
      }
    }).catch(() => {
      setErro(true);
    });
  }, [id]);

  useEffect(() => {
    if (erro) {
      navigate("/erro404");
    }
  }, [erro, navigate]);

  if (!post) {
    return <p className="container">Carregando post...</p>;
  }

  return (
    <main className="container flex flex--centro">
      <article className="cartao post">
        <h2 className="cartao__titulo">{post.title}</h2>
        <h3 className="cartao-post__meta">{post.metadescription}</h3>
        <br />
        <p className="cartao__texto">{post.body}</p>
      </article>
    </main>
  );
};

export default Post;
