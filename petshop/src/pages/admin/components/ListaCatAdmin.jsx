import { useEffect, useState } from "react";
import { busca } from "@api/api";
import { Link } from "react-router-dom";
import "./tabela.css";
import { Button } from "@mui/material";
import { api } from "@api/api";
const ListaCatAdmin = () => {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        busca(`/categorias`, setCategorias)
    }, [])

     const excluir = (CategoriaDel) => {
        api.delete(`categorias/${CategoriaDel.id}/`)
            .then(() => {
            // Remove a categoria do estado local para atualizar a UI
            const listaCategorias = categorias
                .filter(categoria => categoria.id !== CategoriaDel.id);
            setCategorias([...listaCategorias]);
        });
    }
    return (
        <section >
            <table className="tabela">
                <thead>
                    <tr>
                        <th className="tabela__coluna--g">Categoria</th>
                        <th colSpan="3" className="tabela__coluna--p tabela__alinhamento--direita">
                            <Link to="/admin/NovaCategoria">
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ marginTop: 1 }}
                                // usa o sistem de estilização Sx
                                >
                                    Nova Categoria
                                </Button>
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td className="tabela__coluna--m">
                                    <Link
                                        to={`/categoria/${categoria.id}`}
                                    >
                                        {categoria.nome}
                                    </Link>
                                </td>
                                 <td
                                        colSpan="2"
                                        className="tabela__coluna--p tabela__alinhamento--direita"
                                    >
                                    {/* Botão EDITAR */}
                                    <Link
                                        to={`/admin/categoria/${categoria.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="warning"
                                        // Cor MUI para Alerta/Atenção
                                        >
                                            Editar
                                        </Button>
                                    </Link>
                                    
                                    {/* Botão EXCLUIR */}
                                    
                                    <Link
                                        to="/admin"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Button
                                            onClick={() => excluir(categoria)}
                                           type="button"
                                            variant="contained"
                                            color="error"
                                            // Cor MUI para Erro/Remoção
                                            sx={{ margin: "0 0.25rem" }}
                                        >
                                            Excluir
                                        </Button>
                                    </Link>
                                    </td>
                                    <td
                                        colSpan="2"
                                        className="tabela__coluna--p tabela__alinhamento--direita"
                                    >
                                    <Link
                                        to={`/admin/form/categoria/${categoria.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Button
                                           type="button"
                                            variant="outlined"
                                            color="secondary"
                                            // Cor MUI para Erro/Remoção
                                            sx={{ margin: "0 0.25rem" }}
                                        >
                                            SubCategoria
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}

export default ListaCatAdmin