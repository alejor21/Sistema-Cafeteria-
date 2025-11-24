import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const getRoleDisplay = (role) => {
    const roles = {
      'ADMIN': { icon: '⚙️', label: 'Administrador' },
      'EMPLOYEE': { icon: '👤', label: 'Empleado' },
      'STUDENT': { icon: '🎓', label: 'Estudiante' },
      'STAFF': { icon: '👔', label: 'Personal Campus' }
    }
    return roles[role] || { icon: '👤', label: role }
  }

  const roleInfo = user ? getRoleDisplay(user.role) : null

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="logo-icon">☕</div>
          <div className="logo-text">
            <div className="app-title">Cafetería</div>
            <div className="app-tagline">Sistema de gestión</div>
          </div>
        </Link>

        <div className="navbar-links">
          <Link
            to="/orders"
            className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
          >
            <span className="nav-icon">🛍️</span>
            <span>Pedidos</span>
          </Link>

          {isAdmin() && (
            <>
              <Link
                to="/products"
                className={`nav-link ${isActive('/products') ? 'active' : ''}`}
              >
                <span className="nav-icon">🍽️</span>
                <span>Productos</span>
              </Link>

              <Link
                to="/users"
                className={`nav-link ${isActive('/users') ? 'active' : ''}`}
              >
                <span className="nav-icon">👥</span>
                <span>Usuarios</span>
              </Link>

              <Link
                to="/reports"
                className={`nav-link ${isActive('/reports') ? 'active' : ''}`}
              >
                <span className="nav-icon">📊</span>
                <span>Reportes</span>
              </Link>
            </>
          )}
        </div>

        <div className="navbar-user">
          {user ? (
            <>
              <div className="user-info">
                <span className="user-icon">{roleInfo.icon}</span>
                <div className="user-details">
                  <span className="user-name">{user.fullName || user.username}</span>
                  <span className="user-role">{roleInfo.label}</span>
                </div>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <>
              <div className="user-info">
                <span className="user-icon">🎫</span>
                <div className="user-details">
                  <span className="user-name">Invitado</span>
                  <span className="user-role">Acceso limitado</span>
                </div>
              </div>
              <button className="btn-logout" onClick={() => navigate('/login')}>
                Iniciar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
