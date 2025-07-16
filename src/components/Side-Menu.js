import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";

export const SideMenu = (props) => {
    const subLinkClasses = ({ isActive }) =>
    isActive ? "sideSubMenuSelected" : "";

    return (
        <div className="sideMenu">
            <div className="sideMenuContent">
                <nav className="sideMenuNav">
                    <ul>
                        <li>
                            <NavLink to="/vinculos" className={({ isActive }) => 
                                isActive || window.location.pathname === "/" ? "active" : ""
                            }>
                                <img src="/img/chain.svg" className="icon"></img>Mis Vínculos<img className="subMenuDropdownIcon" src="/img/chevron_down.svg"></img>
                            </NavLink>
                            <nav className="sideSubMenuNav">
                                <ul>
                                    <li><NavLink to="/vinculos/familia" className={subLinkClasses}>Familia</NavLink></li>
                                    <li><NavLink to="/vinculos/pareja"className={subLinkClasses} >Pareja</NavLink></li>
                                    <li><NavLink to="/vinculos/amistad" className={subLinkClasses}>Amistad</NavLink></li>
                                    <li><NavLink to="/vinculos/trabajo" className={subLinkClasses}>Trabajo</NavLink></li>
                                    <li><NavLink to="/vinculos/conocido" className={subLinkClasses}>Conocido</NavLink></li>
                                    <li><NavLink to="/vinculos/otro" className={subLinkClasses}>Otro</NavLink></li>
                                </ul>
                            </nav>
                        </li>
                        <li>
                            <NavLink to="/recordatorios">
                                <img src="/img/clock.svg" className="icon"></img>Recordatorios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/estado-general">
                                <img src="/img/arrow.svg" className="icon"></img>Estado General
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/configuracion">
                                <img src="/img/gear.svg" className="icon"></img>Configuración
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}