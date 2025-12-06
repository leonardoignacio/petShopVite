import React, { useState } from 'react';
import { 
    Container, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Box 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';

// Componentes importados
import ListaCatAdmin from '@admin/components/ListaCatAdmin';
import ListaPostAdmin from '@admin/components/ListaPostAdmin';

const Admin = () => {
    // Estado para controlar qual painel está aberto
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary" sx={{ mb: 3 }}>
                Painel Administrativo
            </Typography>

            <Box>
                {/* Painel de Categorias */}
                <Accordion 
                    expanded={expanded === 'panel1'} 
                    onChange={handleChange('panel1')}
                    sx={{ mb: 1 }} // Espacinho entre os acordeões
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        {/* Título com Ícone */}
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', flexShrink: 0 }}>
                            <CategoryIcon color="action" sx={{ mr: 1 }} />
                            <Typography sx={{ fontWeight: 'medium' }}>
                                Categorias
                            </Typography>
                        </Box>
                        
                        {/* Subtítulo (visível apenas em telas maiores se quiser, ou sempre) */}
                        <Typography sx={{ color: 'text.secondary' }}>
                            Gerenciar lista de categorias do sistema
                        </Typography>
                    </AccordionSummary>
                    
                    <AccordionDetails sx={{ p: 0, bgcolor: '#f5f5f5' }}>
                        {/* Removemos o Typography daqui para evitar erro de DOM Nesting */}
                        <Box sx={{ p: 2 }}>
                            <ListaCatAdmin />
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Painel de Posts */}
                <Accordion 
                    expanded={expanded === 'panel2'} 
                    onChange={handleChange('panel2')}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', flexShrink: 0 }}>
                            <ArticleIcon color="action" sx={{ mr: 1 }} />
                            <Typography sx={{ fontWeight: 'medium' }}>
                                Posts
                            </Typography>
                        </Box>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Gerenciar publicações e artigos
                        </Typography>
                    </AccordionSummary>
                    
                    <AccordionDetails sx={{ p: 0, bgcolor: '#f5f5f5' }}>
                        <Box sx={{ p: 2 }}>
                            <ListaPostAdmin />
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}

export default Admin;