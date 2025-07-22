import { NavLink } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const PersonCards = ({ data, toggleUpdateData, filter }) => {

    const bonds = data.bonds;

    const navigate = useNavigate();

    const handleNewPerson = () => {
        var maxID = 0;

        for (var i = 0; i < bonds.length; i++) {
            if (parseInt(bonds[i].id) > maxID)
                maxID = parseInt(bonds[i].id);
        }

        maxID++;

        var newData = {...data};

        newData.bonds.push(
            {
            "id": maxID,
            "name": "",
            "image": "default.svg",
            "type": "familia",
            "status": "estable",
            "last_contact": "",
            "closeness": "cercano",
            "birthday": "",
            "data": {
                "birthday": "",
                "notes": "",
                "nextMeetingDate": "",
                "dynamics": [],
                "limits": [],
                "conflicts": [],
                "challenges": {
                    "active": [],
                    "suggestions": []
                },
                "history": []
            }
        });

        toggleUpdateData(newData);

        localStorage.setItem("newBond", true);

        navigate("/vinculos/persona/" + maxID);
    }

    //localStorage.removeItem("newBond");

    const [searchedName, setSearchedName] = useState("");

    const closenessValue = {
        "íntimo" : 4,
        "muy cercano" : 3,
        "cercano" : 2,
        "neutral" : 1,
        "distante" : 0
    }

    const filteredBonds = bonds
        .filter((person) =>
            filter === "todos" ? true : person.type === filter
        )
        .filter((person) =>
            person.name.toLowerCase().includes(searchedName.toLowerCase())
        )
        .sort((a, b) => 
            closenessValue[b.closeness] - closenessValue[a.closeness]
        );

    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");

        if (day == undefined || month == undefined || year == undefined)
            return "";

        return `${day}/${month}/${year}`;
    }

    const linkClasses = (btnFilter) =>
    btnFilter == filter ? "tabSelected" : "";

    const searchBarRef = useRef(null);

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
                    <input ref={searchBarRef} onChange={(e) => setSearchedName(e.target.value)}
                    id="searchBar" className="searchBarInput" type="text" placeholder="Buscar vínculo"></input>
                </form>
                <button onClick={
                    () => {
                        // Clicking on the phone search button focuses on the hiden search bar
                        if (searchBarRef.current)
                            searchBarRef.current.focus();
                    }
                } type="button" className="searchBtn"><img src="/img/magnifying-glass.svg" width="24px" height="24px"></img></button>
                <button className="hideOnPhone" onClick={handleNewPerson}>+ Añadir vínculo</button>
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
                    <NavLink to={`/vinculos/persona/${person.id}`} className="personCard" key={index}>
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
                            Último contacto: {convertDateFormat(person.last_contact)}
                        </p>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}