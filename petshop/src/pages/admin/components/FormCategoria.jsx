import React, { useState, useEffect } from "react";
import { Button, TextField, Container, Paper, Typography, Box, List, ListItem, ListItemText, IconButton, Divider, Stack } from "@mui/material";
import { api } from "@api/api";
import { useNavigate, useParams } from "react-router-dom";
// Importando ícones para melhor visual (npm install @mui/icons-material)
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';


const FormCategoria = () => {
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [txtSubCategoria, setTxtSubCategoria] = useState('');
    const [subCategorias, setSubCategorias] = useState([]);
    const parametros = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (parametros.id) {
            api.get(`categorias/${parametros.id}/`)
                .then(resposta => {
                    setNomeCategoria(resposta.data.nome);
                    setSubCategorias(resposta.data.subcategorias || []);
                })
                .catch(error => console.error("Erro ao carregar", error));
        }
    }, [parametros]);

    function addSubCategoria() {
        // Validação simples para não adicionar vazio
        if (txtSubCategoria.trim().length > 0) {
            setSubCategorias([...subCategorias, txtSubCategoria]);
            setTxtSubCategoria('');
        }
    }

    // Permite adicionar apertando Enter no teclado
    function apertarEnter(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSubCategoria();
        }
    }

    function excluirSubCategoria(i_remove) {
        // Melhor prática: Filtrar pelo índice, não pelo valor (evita bugs com nomes duplicados)
        setSubCategorias(subCategorias.filter((_, i) => i !== i_remove));
    }

    const salvarCategoria = (e) => {
        e.preventDefault(); // Previne refresh da página     
        if (parametros.id) {
            api.put(`/categorias/${parametros.id}`, {
                nome: nomeCategoria,
                subcategorias: subCategorias
            })
                .then(() => {
                    alert("A atualização foi realizada com sucesso!");
                    navigate('/admin');
                });
        } else {
            api.post(`/categorias`, {
                id: nomeCategoria,
                nome: nomeCategoria,
                subcategorias: subCategorias 
            })
                .then(() => {
                    alert("Registro inserido com sucesso!");
                    navigate('/admin');
                });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary">
                    {parametros.id ? "Editar Categoria" : "Nova Categoria"}
                </Typography>

                <Box component="form" onSubmit={salvarCategoria} noValidate sx={{ mt: 2 }}>

                    {/* Campo Nome da Categoria */}
                    <TextField
                        value={nomeCategoria}
                        onChange={evento => setNomeCategoria(evento.target.value)}
                        id="nome-categoria"
                        label="Nome da Categoria Principal"
                        variant="outlined"
                        fullWidth
                        required
                        margin="normal"
                    />

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="caption" color="text.secondary">
                            SUBCATEGORIAS
                        </Typography>
                    </Divider>

                    {/* Área de Adicionar Subcategoria */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="stretch">
                        <TextField
                            value={txtSubCategoria}
                            onChange={evento => setTxtSubCategoria(evento.target.value)}
                            onKeyDown={apertarEnter}
                            label="Nova Subcategoria"
                            variant="outlined"
                            fullWidth
                            placeholder="Insira a nova SubCategoria"
                        />
                        <Button
                            variant="contained"
                            size="large"
                            onClick={addSubCategoria}
                            startIcon={<AddCircleOutlineIcon />}
                            disabled={txtSubCategoria.length === 0}
                            sx={{ minWidth: '120px' }}
                        >
                            Add
                        </Button>
                    </Stack>

                    {/* Lista de Subcategorias Adicionadas */}
                    <Box sx={{ mt: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                        {subCategorias.length === 0 ? (
                            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                                Nenhuma subcategoria...
                            </Typography>
                        ) : (
                            <List dense>
                                {subCategorias.map((subCat, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    color="error"
                                                    onClick={() => excluirSubCategoria(index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText primary={subCat} />
                                        </ListItem>
                                        {index < subCategorias.length - 1 && <Divider component="li" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        )}
                    </Box>

                    {/* Botão Salvar Global */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        startIcon={<SaveIcon />}
                        sx={{ mt: 4, py: 1.5 }}
                    >
                        Salvar Tudo
                    </Button>

                </Box>
            </Paper>
        </Container>
    );
}

export default FormCategoria;