import { NavLink, Route, Routes } from 'react-router-dom';
import { DynamicsPage } from './Dynamic-Page';
import { LimitsPage } from './Limits-Page';
import { ConflictPage } from './Conflicts-Page';
import { ChallengesPage } from './Challenges-Page';
import { HistoryPage } from './History-Page';
import { useState } from 'react';
import { EditWindow } from './Edit-Window';
import { useNavigate } from "react-router-dom";

export const PersonDataMenu = ({ bonds, index }) => {
    const navigate = useNavigate();

    const person = bonds[index];

    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    
    const toggleSideMenuVisible = () => {
        setSideMenuVisible(prev => !prev);
    };

    const [selectedTab, setSelectedTab] = useState("dinamicas");

    const changeSelectedTab = (newTab) => {
        setSelectedTab(newTab);
    };

    const [editWindowVisible, setEditWindoVisible] = useState(false);
    
    const toggleEditWindowVisible = () => {
        setEditWindoVisible(prev => !prev);
    };

    /* Birthday */

    function formatBirthday(dateOfBirth) {
        const date = new Date(dateOfBirth);

        const monthsInSpanish = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const day = date.getDate();
        const month = monthsInSpanish[date.getMonth()];

        if (isNaN(day)) return " ";

        return `${day} de ${month}`;
    }

    /* Check how many days since last contact */

    function daysAgo(dateString) {
        if (dateString == "") return " ";

        const inputDate = new Date(dateString);
        const today = new Date();

        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInMs = today - inputDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (isNaN(diffInDays)) return " ";

        if (diffInDays === 0) return "Hoy";
        if (diffInDays === 1) return "Hace 1 día";
        if (diffInDays > 1) return `Hace ${diffInDays} días`;
        return `Faltan ${Math.abs(diffInDays)} días`;
    }

    return (
        <div className="personDataMenu">
            { editWindowVisible && <EditWindow person={person} toggleEditWindowVisible={toggleEditWindowVisible}></EditWindow> }
            <div className="personDataSide contentWrap">
                <div className='personDataTop infoSection'>
                    <div className="personPhotoAndName">
                        <img
                            src={`/img/people/${person.image}`}
                            alt={person.name}
                            className="personImage"
                        />
                        <div>
                            <h2><strong>{person.name}</strong></h2>
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
                </div>

                <div className="infoSection">
                    <div className="dataName">Estado: </div>
                    <span className="dataValue">{ person.status }</span>
                </div>
                <div className="infoSection">
                    <div className="dataName">Último contacto: </div>
                    <span className="dataValue">{ daysAgo(person.last_contact) }</span>
                </div>
                <div className="infoSection">
                    <div className="dataName">Cumpleaños: </div>
                    <span className="dataValue">{ formatBirthday(person.birthday) }</span>
                </div>
                <div className="infoSection">
                    <div className="dataName">Notas: </div>
                    <textarea id="personNotes" className="dataValue" defaultValue={ person.data.notes }></textarea>
                </div>
                <div className="infoSection">
                    <div className="dataName">Próxima reunión: </div>
                    <input id="personNextMeetingDate" className="dataValue" defaultValue={person.data.nextMeetingDate} type="date"></input>
                </div>
                <nav className="personDataBottomBtns">
                    <ul>
                        <li>
                            <button type="button" onClick={toggleEditWindowVisible}>Editar vínculo</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => {
                                if (window.confirm("¿Estas seguro?")) {
                                    bonds.splice(index,1);
                                    navigate("/vinculos");
                                }}
                            }>Eliminar vínculo</button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={"personTabsSide contentWrap" + (sideMenuVisible ? "" : " personTabsSideHidden") }>
                <button type="button" className={"expandBtn" + (sideMenuVisible ? " expandBtnOpen" : "")} onClick={toggleSideMenuVisible}></button>
                <nav className="personTabs">
                    <ul>
                        <li><button type="button" onClick={() => setSelectedTab("dinamicas")} className={selectedTab == "dinamicas" ? "active" : ""}>Dinámicas</button></li>
                        <li><button type="button" onClick={() => setSelectedTab("limites")} className={selectedTab == "limites" ? "active" : ""}>Límites</button></li>
                        <li><button type="button" onClick={() => setSelectedTab("conflictos")} className={selectedTab == "conflictos" ? "active" : ""}>Conflictos</button></li>
                        <li><button type="button" onClick={() => setSelectedTab("desafios")} className={selectedTab == "desafios" ? "active" : ""}>Desafíos</button></li>
                        <li><button type="button" onClick={() => setSelectedTab("historial")} className={selectedTab == "historial" ? "active" : ""}>Historial</button></li>
                    </ul>
                </nav>
                
                <div className="personDataAccordion">
                    <div className="personDataAccordionElem">
                        <button type="button" onClick={() => setSelectedTab("dinamicas")} className={"personDataAccordionBtn" + (selectedTab == "dinamicas" ? " active" : "")}>Dinámicas</button>
                        {(selectedTab == "dinamicas") && <DynamicsPage person={person} />} 
                    </div>
                    <div className="personDataAccordionElem">
                        <button type="button" onClick={() => setSelectedTab("limites")} className={"personDataAccordionBtn" + (selectedTab == "limites" ? " active" : "")}>Límites</button>
                        {(selectedTab == "limites") && <LimitsPage person={person} />}
                    </div>
                    <div className="personDataAccordionElem">
                        <button type="button" onClick={() => setSelectedTab("conflictos")} className={"personDataAccordionBtn" + (selectedTab == "conflictos" ? " active" : "")}>Conflictos</button>
                        {(selectedTab == "conflictos") && <ConflictPage person={person} />}
                    </div>
                    <div className="personDataAccordionElem">
                        <button type="button" onClick={() => setSelectedTab("desafios")} className={"personDataAccordionBtn" + (selectedTab == "desafios" ? " active" : "")}>Desafíos</button>
                        {(selectedTab == "desafios") && <ChallengesPage person={person} />}
                    </div>
                    <div className="personDataAccordionElem">
                        <button type="button" onClick={() => setSelectedTab("historial")} className={"personDataAccordionBtn" + (selectedTab == "historial" ? " active" : "")}>Historial</button>
                        {(selectedTab == "historial") && <HistoryPage person={person} />}
                    </div>
                </div>
            </div>
        </div>
    )
}