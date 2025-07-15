import { NavLink } from "react-router-dom";

export const PersonCards = ({ bonds, filter }) => {

    const filteredBonds =
        filter !== "todos"
            ? bonds.filter((person) => person.type === filter)
            : bonds;

    const linkClasses = (btnFilter) =>
    btnFilter == filter ? "tabSelected" : "";

    return (
        <div className="bondsMenu contentWrap">
            <h1>Mis Vínculos</h1>
            <div className="bondsOps">
                <button className="filterButton hideOnDesktop">
                    <img src="/img/filter_icon.svg"></img>
                </button>
                <form className="searchBar" action="get">
                    <span className="searchBarMagnGlass" style={{
                        backgroundImage: 'url(/img/magnifying-glass.svg)'
                    }}></span>
                    <input id="searchBar" className="searchBarInput" type="text" placeholder="Buscar vínculo"></input>
                </form>
                <a href="." className="hideOnPhone">+ Añadir vínculo</a>
                <label className="hideOnPhone" htmlFor="filterBond">Ordenar por:</label>
                <div className="filterSelect">
                    <select id="filterBond" className="filterSelectInput">
                        <option value="cercania-emocional">Cercanía emocional</option>
                    </select>
                </div>
            </div>

            <nav className="bondTabs">
                <ul>
                    <li><NavLink to="/vinculos/todos" className={linkClasses("todos")}>Todos</NavLink></li>
                    <li><NavLink to="/vinculos/familia" className={linkClasses("familia")}>Familia</NavLink></li>
                    <li><NavLink to="/vinculos/pareja" className={linkClasses("pareja")}>Pareja</NavLink></li>
                    <li><NavLink to="/vinculos/amistad" className={linkClasses("amistad")}>Amistad</NavLink></li>
                    <li><NavLink to="/vinculos/trabajo" className={linkClasses("trabajo")}>Trabajo</NavLink></li>
                    <li><NavLink to="/vinculos/conocido" className={linkClasses("conocido")}>Conocido</NavLink></li>
                    <li><NavLink to="/vinculos/otro" className={linkClasses("otro")}>Otro</NavLink></li>
                </ul>
            </nav>

            <div className="personCards">
                {filteredBonds.map((person, index) => (
                    <NavLink to={`/vinculos/${person.type}/${person.id}`} className="personCard" key={index}>
                        <div className="personPhotoAndName">
                            <img
                                src={`/img/people/${person.image}`}
                                alt={person.name}
                                className="personImage"
                            />
                            <div>
                                <h2>{person.name}</h2>
                                <span className="bondTag">{person.type}</span>
                                {
                                    person.closeness === "íntimo" ? (
                                        <span className="bondTag bondTagIntimate">íntimo</span>
                                    ) : person.closeness === "muy cercano" ? (
                                        <span className="bondTag bondTagVeryClose">muy cercano</span>
                                    ) : person.closeness === "cercano" ? (
                                        <span className="bondTag bondTagClose">cercano</span>
                                    ) : person.closeness === "neutral" ? (
                                        <span className="bondTag bondTagNeutral">neutral</span>
                                    ) : (
                                        <span className="bondTag bondTagDistant">distante</span>
                                    )
                                }
                            </div>
                        </div>
                        <p className="personStatus">
                            Estado: {person.status.charAt(0).toUpperCase() + person.status.slice(1)}
                            <br />
                            Último contacto: {person.last_contact}
                        </p>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}