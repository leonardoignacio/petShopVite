import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    Button, 
    Container, 
    Paper, 
    Typography, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar,
    Avatar,
    IconButton, 
    Stack, 
    Divider,
    Chip,
    Tooltip,
    Box
} from "@mui/material";

// Ícones (npm install @mui/icons-material)
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article'; // Ícone para "Post"

import { api, busca } from "@api/api";
// CSS removido

const ListaPostAdmin = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        busca(`/posts`, setPosts);
    }, []);

    const excluir = (PostDel) => {
        if (window.confirm(`Deseja realmente excluir o post "${PostDel.title}"?`)) {
            api.delete(`posts/${PostDel.id}/`)
                .then(() => {
                    setPosts(prevPosts => prevPosts.filter((post) => post.id !== PostDel.id));
                })
                .catch(err => {
                    console.error("Erro ao excluir", err);
                    alert("Erro ao tentar excluir o post.");
                });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                
                {/* Cabeçalho: Título + Botão Novo Post */}
                <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    sx={{ mb: 3 }}
                >
                    <Typography variant="h5" component="h2" color="primary">
                        Gerenciar Posts
                    </Typography>

                    <Button 
                        component={Link} 
                        to="/admin/posts/NovoPost"
                        variant="contained" 
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Novo Post
                    </Button>
                </Stack>

                <Divider />

                {/* Lista de Posts */}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {posts.length === 0 ? (
                        <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                            Nenhum post encontrado.
                        </Typography>
                    ) : (
                        posts.map((post, index) => (
                            <React.Fragment key={post.id}>
                                <ListItem
                                    alignItems="flex-start"
                                    secondaryAction={
                                        <Stack direction="row" spacing={1}>
                                            <Tooltip title="Editar Post">
                                                <IconButton 
                                                    component={Link} 
                                                    to={`/admin/posts/NovoPost/${post.id}`}
                                                    color="warning"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Excluir Post">
                                                <IconButton 
                                                    edge="end" 
                                                    aria-label="delete" 
                                                    color="error"
                                                    onClick={() => excluir(post)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    }
                                >
                                    {/* Ícone do Artigo */}
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            <ArticleIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                    {/* Textos do Item */}
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6" component="span" sx={{ display: 'block' }}>
                                                <Link 
                                                    to={`/posts/${post.id}`} 
                                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                                >
                                                    {post.title}
                                                </Link>
                                            </Typography>
                                        }
                                        secondary={
                                            <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 0.5 }}>
                                                {/* Categoria com Chip */}
                                                <Box component="span">
                                                    <Chip 
                                                        label={post.categoria} 
                                                        size="small" 
                                                        variant="outlined" 
                                                        color="secondary" 
                                                    />
                                                </Box>
                                                
                                                {/* Descrição do Post */}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ 
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 2, // Limita a 2 linhas e põe "..."
                                                    }}
                                                >
                                                    {post.metadescription}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < posts.length - 1 && <Divider component="li" variant="inset" />}
                            </React.Fragment>
                        ))
                    )}
                </List>
            </Paper>
        </Container>
    );
};

export default ListaPostAdmin;