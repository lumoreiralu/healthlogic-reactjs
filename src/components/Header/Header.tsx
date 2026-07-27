import './Header.css';
import Logo from '../../assets/Logo.png';

function Header() {
  return (
    
    <header className="header">
        
      <nav className="nav-container">
      
        <ul className="nav-list">
            <img src={Logo} alt='Logo' className='logo'/>
          <li><a href="#Pacientes">Pacientes</a></li>
          <li><a href="#IMC">Medir IMC</a></li>
          <li><a href="#Hidratación">Calcular hidratacion</a></li>
          <li><a href="#TMB">Medir TMB</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;