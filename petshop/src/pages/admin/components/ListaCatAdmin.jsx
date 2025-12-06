import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    Button, 
    Container, 
    Paper, 
    Typography, 
    Box, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemButton,
    IconButton, 
    Stack, 
    Divider,
    Tooltip
} from "@mui/material";

// Ícones (npm install @mui/icons-material)
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { busca, api } from "@api/api";
// import "./tabela.css"; // Arquivo CSS removido/desnecessário

const ListaCatAdmin = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        // Ajustei para usar a função busca corretamente
        busca(`/categorias`, setCategorias);
    }, []);

    const excluir = (CategoriaDel) => {
        if (window.confirm(`Tem certeza que deseja excluir "${CategoriaDel.nome}"?`)) {
            api.delete(`categorias/${CategoriaDel.id}/`)
                .then(() => {
                    setCategorias(prevCategorias => 
                        prevCategorias.filter(categoria => categoria.id !== CategoriaDel.id)
                    );
                })
                .catch(err => {
                    console.error("Erro ao excluir", err);
                    alert("Erro ao excluir categoria.");
                });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                
                {/* Cabeçalho: Título + Botão de Nova Categoria */}
                <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    sx={{ mb: 3 }}
                >
                    <Typography variant="h5" component="h2" color="primary">
                        Administrar Categorias
                    </Typography>

                    <Button 
                        component={Link} 
                        to="/admin/NovaCategoria"
                        variant="contained" 
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Nova Categoria
                    </Button>
                </Stack>

                <Divider />

                {/* Lista de Categorias */}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {categorias.length === 0 ? (
                        <Typography sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                            Nenhuma categoria encontrada.
                        </Typography>
                    ) : (
                        categorias.map((categoria, index) => (
                            <React.Fragment key={categoria.id}>
                                <ListItem
                                    disablePadding
                                    secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                            {/* Botão Visualizar (Opcional, baseado no link original do nome) */}
                                            <Tooltip title="Ver no Site">
                                                <IconButton 
                                                    component={Link} 
                                                    to={`/categoria/${categoria.id}`}
                                                    color="primary"
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Tooltip>

                                            {/* Botão Editar */}
                                            <Tooltip title="Editar">
                                                <IconButton 
                                                    component={Link} 
                                                    to={`/admin/categoria/${categoria.id}`}
                                                    color="warning"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>

                                            {/* Botão Excluir */}
                                            <Tooltip title="Excluir">
                                                <IconButton 
                                                    edge="end" 
                                                    aria-label="delete" 
                                                    color="error"
                                                    onClick={() => excluir(categoria)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    }
                                >
                                    {/* Área clicável do texto (Leva para edição ou visualização, conforme sua preferência) */}
                                    <ListItemButton component={Link} to={`/admin/categoria/${categoria.id}`}>
                                        <ListItemText 
                                            primary={categoria.nome} 
                                            primaryTypographyProps={{ fontWeight: 'medium' }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                
                                {/* Adiciona uma linha divisória, exceto após o último item */}
                                {index < categorias.length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))
                    )}
                </List>
            </Paper>
        </Container>
    );
}

export default ListaCatAdmin;