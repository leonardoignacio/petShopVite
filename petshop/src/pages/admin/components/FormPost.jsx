import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Container, Paper, Typography,Stack } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save'; // npm install @mui/icons-material
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@api/api";

// Não é mais necessário importar o CSS de textarea, pois usaremos componentes MUI nativos

const FormPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [metadescription, setMetadescription] = useState("");
    const [body, setBody] = useState("");
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);

    // Busca as categorias para o Select
    useEffect(() => {
        api.get("categorias/")
            .then((resposta) => setCategorias(resposta.data))
            .catch((err) => console.error("Erro ao carregar categorias", err));
    }, []);

    // Efeito para buscar dados do post (se estiver em modo Edição)
    useEffect(() => {
        if (id) {
            api.get(`posts/${id}/`)
                .then((resposta) => {
                    setTitle(resposta.data.title);
                    setMetadescription(resposta.data.metadescription);
                    setBody(resposta.data.body);
                    // Garante que categoria seja string vazia se vier nulo para não quebrar o Select
                    setCategoria(resposta.data.categoria || ""); 
                })
                .catch((err) => console.error("Erro ao carregar post", err));
        }
    }, [id]);

    const CadPost = (evento) => { 
        evento.preventDefault(); 

        const postData = {
            title,
            metadescription,
            body,
            categoria
        };

        const request = id 
            ? api.put(`/posts/${id}`, postData) 
            : api.post(`/posts`, postData);

        request
            .then(() => {
                alert(id ? "Sucesso na atualização!" : "Cadastro realizado com Sucesso!");
                navigate("/admin/posts/");
            })
            .catch((error) => {
                console.error("Erro ao salvar", error);
                alert("Ocorreu um erro ao salvar o post.");
            });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary">
                    {id ? "Editar Post" : "Novo Post"}
                </Typography>

                <Box component="form" onSubmit={CadPost} noValidate sx={{ mt: 2 }}>
                    <Stack spacing={3}> {/* Stack cria espaçamento vertical automático de 24px (3 * 8) */}
                        
                        <TextField
                            value={title}
                            onChange={(evento) => setTitle(evento.target.value)}
                            label="Título do Post"
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <TextField
                            value={metadescription}
                            onChange={(evento) => setMetadescription(evento.target.value)}
                            label="Subtítulo / Meta Descrição"
                            variant="outlined"
                            fullWidth
                            required
                        />

                        {/* Substituição do Textarea pelo TextField Multiline */}
                        <TextField
                            value={body}
                            onChange={(evento) => setBody(evento.target.value)}
                            label="Conteúdo do Post"
                            placeholder="Escreva o conteúdo aqui..."
                            multiline
                            minRows={6} // Define a altura inicial
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <FormControl fullWidth required>
                            <InputLabel id="select-categoria-label">Categoria</InputLabel>
                            <Select
                                labelId="select-categoria-label"
                                id="select-categoria"
                                value={categoria}
                                label="Categoria"
                                onChange={(evento) => setCategoria(evento.target.value)}
                            >
                                <MenuItem value="">
                                    <em>Selecione uma categoria</em>
                                </MenuItem>
                                {categorias.map((cat) => (
                                    <MenuItem key={cat.id} value={cat.id}>
                                        {cat.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={<SaveIcon />}
                            sx={{ py: 1.5 }}
                        >
                            Salvar Publicação
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
};

export default FormPost;