import { Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@api/api";

const FormCategoria = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura o ID da URL
    const [nomeCategoria, setNomeCategoria] = useState('');

    // Efeito para buscar dados se estiver em modo de edição
    useEffect(() => {
        if (id) {
            api.get(`categorias/${id}/`)
                .then(resposta => setNomeCategoria(resposta.data.nome));
        }
    }, [id]); // Re-executa se o ID mudar

const CadCategoria = (evento) => {
        evento.preventDefault()

        if (id) {
            api.put(`/categorias/${id}`, {
                id: nomeCategoria,
                nome: nomeCategoria,
                subcategorias: []
            })
                .then(() => {
                    alert("Sucesso na atualização!")
                    navigate('/admin')
                })
        } else {
            api.post(`/categorias`, {
                id: nomeCategoria,
                nome: nomeCategoria,
                subcategorias: []
            })
                .then(() => {
                    alert("Cadastro realizado com Sucesso!")
                    navigate('/admin')
                })
        }
    }
    return (
        <main className="container flex flex--centro">
            <article className="cartao post">
                <h2 className="titulo-pagina">
                    {/* título dinâmico */}
                    {id ? 'Editar Categoria' : 'Cadastro de Categorias'}
                </h2>
                <br />
                <form onSubmit={CadCategoria} >
                    <TextField
                        value={nomeCategoria}
                        onChange={evento => setNomeCategoria(evento.target.value)}
                        label="Categoria"
                        variant="filled"
                        fullWidth
                        required
                    />
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginTop: 1 }}
                        fullWidth
                    >
                        {id? 'Salvar':'Cadastrar'}
                    </Button>
                </form>
            </article>
        </main>
    );
}

export default FormCategoria;