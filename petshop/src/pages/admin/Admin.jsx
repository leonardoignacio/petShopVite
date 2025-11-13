import { useState } from 'react'
import ListaCatAdmin from '@admin/components/ListaCatAdmin'
import ListaPostAdmin from '@admin/components/ListaPostAdmin'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Admin = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <main>
            <div className="container">
                <h2 className="titulo-pagina">Administração</h2>

                <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                                Categorias
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ListaCatAdmin />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                                Posts
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <ListaPostAdmin />
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                </div>
            </div>
        </main>
    )
}

export default Admin