import { Outlet } from 'react-router-dom';
import { NavAdmin } from '@admin/components/NavAdmin';

// Este componente atua como o layout pai para todas as rotas /admin
const AdminLayout = () => {
    return (
        <>
            {/* O NavAdmin é renderizado em todas as sub-rotas */}
            <NavAdmin />

            {/* O <Outlet> renderiza o componente filho (index, NovaCategoria, :id, etc.) */}
            <Outlet />
        </>
    )
}

export default AdminLayout;