import { useState } from "react";
import { ConflictPage } from "./Conflicts-Page";
import { DynamicsPage } from "./Dynamic-Page";
import { LimitsPage } from "./Limits-Page";
import { ChallengesPage } from "./Challenges-Page";
import { HistoryPage } from "./History-Page";
import Slider from '@mui/material/Slider';
import { useNavigate } from "react-router-dom";

const HistoryEdit = ({ person, setMobileWindowOpen }) => {
    const [windowsOpen, setWindowsOpen] = useState(false);

    const [satisfactionValue, setSatisfactionValue] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setSatisfactionValue(newValue);
    };

    const [addedTags, setAddedTags] = useState([]);

    const handleTags = () => {
        const newTags = [...addedTags];
        newTags.push("");
        setAddedTags(newTags);
    }

    const updateTag = (newTag, index) => {
        const newTags = [...addedTags];
        
        newTags[index] = newTag.slice(0, 20);
        setAddedTags(newTags);
    }

    const [historyDate, setHistoryDate] = useState("");
    const [activityType, setActivityType] = useState("");
    const [historyDesc, setHistoryDesc] = useState("");

    return (
        <div className="historyPage">
            <h1 className="hideOnBigScreen">Editar Vínculo</h1>
            {
                !windowsOpen &&
                <div>
                    <div className="editPageHeading">
                        <h2>Historial</h2>
                        <button onClick={() => setWindowsOpen(true)} className="editPageHeadingBtn" type="button">+ Registrar Interacción</button>
                    </div>
                    <HistoryPage person={person}></HistoryPage>
                    <div className="formSubmitSection">
                        <button className="hideOnBigScreen" type="button" onClick={() => setMobileWindowOpen(false)}>Atrás</button>
                    </div>
                </div>
            }
            {
                windowsOpen &&
                <div>
                    <h2>Registrar Interacción</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        for (var i = 0; i < addedTags; i++) {
                            if (addedTags[i] == "") {
                                alert("No se permiten etiquetas vacias.");
                                return;
                            }
                        }

                        const newHistory = {
                            "date" : historyDate,
                            "activity" : activityType,
                            "satisfaction" : satisfactionValue == 0 ? "Triste" :
                                                satisfactionValue == 1 ? "Decepcionado" :
                                                satisfactionValue == 2 ? "Neutro" :
                                                satisfactionValue == 3 ? "Conforme" :
                                                satisfactionValue == 4 ? "Contento" :
                                                satisfactionValue == 5 ? "Feliz" : "",
                            "description" : historyDesc,
                            "tags" : addedTags
                        };

                        person.data.history.push(newHistory);
                        setAddedTags([]);
                        setWindowsOpen(false);
                    }}>
                        <div className="formSection">
                            <label htmlFor="interactionDate">Fecha</label>
                            <input type="date" id="interactionDate" onChange={(e) => setHistoryDate(e.target.value)} required></input>
                        </div>
                        <div className="formSection">
                            <label htmlFor="dynamicType">Tipo de actividad</label>
                            <div className="selectWrap">
                                <select id="dynamicType" onChange={(e) => setActivityType(e.target.value)} required>
                                    <option value="Mensaje">Mensaje</option>
                                    <option value="Quedada">Quedada</option>
                                    <option value="Videollamada">Videollamada</option>
                                    <option value="Llamada">Llamada</option>
                                    <option value="Encuentro casual">Encuentro casual</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>
                        <div className="formSection">
                            <label htmlFor="dynamicDesc">Description</label>
                            <textarea id="dynamicDesc" onChange={(e) => setHistoryDesc(e.target.value)} required></textarea>
                        </div>
                        <div className="formSection">
                            <label>Satisfacción</label>
                            <div className="sliderFaces">
                                <div className="sliderFace">
                                    <span className={"sliderSatisfLevelName" + (satisfactionValue == 0 ? " sliderSatisfSel" : "")}>Triste</span>
                                    <button onClick={() => setSatisfactionValue(0)} type="button"><img src="/img/history/face-sad.svg"></img></button>
                                </div>
                                <div className="sliderFace">
                                    <span className={"sliderSatisfLevelName" + (satisfactionValue == 1 ? " sliderSatisfSel" : "")}>Decepcionado</span>
                                    <button onClick={() => setSatisfactionValue(1)} type="button"><img src="/img/history/face-frown.svg"></img></button>
                                </div>
                                <div className="sliderFace">
                                    <span className={"sliderSatisfLevelName" + (satisfactionValue == 2 ? " sliderSatisfSel" : "")}>Neutro</span>
                                    <button onClick={() => setSatisfactionValue(2)} type="button"><img src="/img/history/face-neutral.svg"></img></button>
                                </div>
                                <div className="sliderFace">
                                    <span className={"sliderSatisfLevelName" + (satisfactionValue == 3 ? " sliderSatisfSel" : "")}>Conforme</span>
                                    <button onClick={() => setSatisfactionValue(3)} type="button"><img src="/img/history/face-content.svg"></img></button>
                                </div>
                                <div className="sliderFace">
                                    <span className={"sliderSatisfLevelName" + (satisfactionValue == 4 ? " sliderSatisfSel" : "")}>Content</span>
                                    <button onClick={() => setSatisfactionValue(4)} type="button"><img src="/img/history/face-content.svg"></img></button>
                                </div>
                                <div className="sliderFace">
                                    <span className={"sliderSatisfLevelName" + (satisfactionValue == 5 ? " sliderSatisfSel" : "")}>Feliz</span>
                                    <button onClick={() => setSatisfactionValue(5)} type="button"><img src="/img/history/face-happy.svg"></img></button>
                                </div>
                            </div>
                            <div className="sliderWrap">
                                <Slider
                                    size="small"
                                    min={0}
                                    step={1}
                                    max={5}
                                    value={satisfactionValue}
                                    onChange={handleSliderChange}
                                />
                            </div>
                        </div>
                        <div className="formSection">
                            <label>Etiquetas</label>
                            <div className="formTagsInput">
                                {
                                    addedTags.map((tag, index) => (
                                        <input id={"tag" + index} value={tag} className="tagInput" type="text"
                                        onChange={(e) => updateTag(e.target.value, index)}></input>
                                    ))
                                }
                                {
                                    addedTags.length !== 3 && 
                                    <button onClick={handleTags} type="button" className="addTagBtn">+</button>
                                }
                                
                            </div>
                        </div>
                        <div className="formSubmitSection">
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={() => setWindowsOpen(false)}>Descartar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

const ChallengesEdit = ({ person, setMobileWindowOpen }) => {
    const [windowsOpen, setWindowsOpen] = useState(false);

    const [challengeName, setChallengeName] = useState("");
    const [challengeDesc, setChallengeDesc] = useState("");
    const [challengeDate, setChallengeDate] = useState("");

    return (
        <div className="conflictPage">
            <h1 className="hideOnBigScreen">Editar Vínculo</h1>
            {
                !windowsOpen &&
                <div>
                    <div className="editPageHeading"><h2>Desafíos</h2><button onClick={() => setWindowsOpen(true)} className="editPageHeadingBtn" type="button">+ Crear desafío personalizado</button></div>
                    <p className="editWindowDesc">Desafíos que te ayudarán a mejorar el vínculo</p>
                    <ChallengesPage person={person}></ChallengesPage>
                    <div className="formSubmitSection">
                        <button className="hideOnBigScreen" type="button" onClick={() => setMobileWindowOpen(false)}>Atrás</button>
                    </div>
                </div>
            }
            {
                windowsOpen &&
                <div>
                    <h2>Crear Desafío</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const newChallenge = {
                            "title" : challengeName,
                            "action" : challengeDesc,
                            "date" : challengeDate,
                        }

                        person.data.challenges.active.push(newChallenge);
                        setWindowsOpen(false);
                    }}
                    >
                        <div className="formSection">
                            <label htmlFor="challengeName">Objetivo</label>
                            <input onChange={(e) => setChallengeName(e.target.value)} type="text" id="challengeName" placeholder="Introduce un objetivo" required></input>
                        </div>
                        <div className="formSection">
                            <label htmlFor="challengeDesc">Acción</label>
                            <textarea onChange={(e) => setChallengeDesc(e.target.value)} id="challengeDesc" placeholder="Introduce una acción" required></textarea>
                        </div>
                        <div className="formSection">
                            <label htmlFor="challengeDate">Plazo</label>
                            <input onChange={(e) => setChallengeDate(e.target.value)} type="date" id="challengeDate" required></input>
                        </div>
                        <div className="formSubmitSection">
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={() => setWindowsOpen(false)}>Descartar</button>
                        </div>
                    </form>
                </div>
            }

        </div>
    )
}

const ConflictEdit = ({ person, setMobileWindowOpen }) => {
    const [windowsOpen, setWindowsOpen] = useState(false);

    const toggleWindowsOpen = () => {
        setWindowsOpen(prev => !prev);
    };

    const [conflictDate, setConflictDate] = useState("");
    const [conflictTitle, setConflictTitle] = useState("");
    const [conflictDesc, setConflictDesc] = useState("");
    const [conflictSolution, setConflictSolution] = useState("");
    const [agreement, setAgreement] = useState(false);

    return (
        <div className="conflictPage">
            <h1 className="hideOnBigScreen">Editar Vínculo</h1>
            {
                !windowsOpen &&
                <div>
                    <div className="editPageHeading">
                        <h2>Conflictos</h2><button onClick={toggleWindowsOpen} className="editPageHeadingBtn" type="button">+ Añadir Conflicto</button>
                    </div>
                    <ConflictPage person={person}></ConflictPage>
                    <div className="formSubmitSection">
                        <button className="hideOnBigScreen" type="button" onClick={() => setMobileWindowOpen(false)}>Atrás</button>
                    </div>
                </div>

            }
            {
                windowsOpen &&
                <div>
                    <h2>Nuevo conflicto</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const newConflict = {
                            "date" : conflictDate,
                            "title" : conflictTitle,
                            "description" : conflictDesc,
                            "solution" : conflictSolution,
                            "isSolved" : agreement
                        }

                        person.data.conflicts.push(newConflict);
                        setWindowsOpen(false);
                        setConflictSolution("");
                    }}>
                        <div className="formSection">
                            <div className="formDoubleField">
                                <label htmlFor="conflictDate">Fecha</label>
                                <div className="formButtonChoice">
                                    <button onClick={() => setAgreement(false)} type="button" className={"thumbsButton" + (!agreement ? " thumbsButtonSelected" : "")}>
                                        <span className="thumbsButtonImg thumbsDownButtonImg"></span>Sin acuerdo
                                    </button>
                                    <button onClick={() => setAgreement(true)} type="button" className={"thumbsButton" + (agreement ? " thumbsButtonSelected" : "")}>
                                        <span className="thumbsButtonImg thumbsUpButtonImg"></span>Conciliación
                                    </button>
                                </div>
                            </div>
                            <input onChange={(e) => setConflictDate(e.target.value)} type="date" id="conflictDate" required></input>
                        </div>
                        <div className="formSection">
                            <label htmlFor="conflictDesc">Descripción</label>
                            <input onChange={(e) => setConflictTitle(e.target.value)}  type="text" id="conflictDesc" placeholder="Introduzca una descripción" required></input>
                        </div>
                        <div className="formSection">
                            <label htmlFor="conflictDetails">Conflicto</label>
                            <textarea onChange={(e) => setConflictDesc(e.target.value)} id="conflictDetails" placeholder="Detalles del conflicto" required></textarea>
                        </div>
                        <div className="formSection">
                            <label htmlFor="conflictAgreement">Acuerdo</label>
                            <textarea onChange={(e) => setConflictSolution(e.target.value)} id="conflictAgreement" placeholder="Detalles del acuerdo (opcional)"></textarea>
                        </div>
                        <div className="formSubmitSection">
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={toggleWindowsOpen}>Descartar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

const LimitsEdit = ({ person, setMobileWindowOpen }) => {
    const [windowsOpen, setWindowsOpen] = useState(false);

    const toggleWindowsOpen = () => {
        setWindowsOpen(prev => !prev);
    };

    const [limits, setLimits] = useState(person.data.limits);

    const toggleLimit = (index) => {
        const updatedLimits = limits.map((limit, i) =>
            i === index ? { ...limit, enabled: !limit.enabled } : limit
        );
        person.data.limits = updatedLimits;
        setLimits(updatedLimits);
    };

    const [addLimitWindowOpen, setAddLimitWindowOpen] = useState(false);

    const [limitDesc, setLimitDesc] = useState("");

    return (
        <div className="limitsPage">
            <h1 className="hideOnBigScreen">Editar Vínculo</h1>
            {
                !windowsOpen &&
                <div>
                    <h2>Límites con este vínculo</h2>
                    <p className="editWindowDesc">Tus límites para este vínculo y las conductas que no estás dispuesto/a a aceptar</p>
                    <div className="formSection">
                        <LimitsPage person={person}></LimitsPage>
                    </div>
                    <div className="formSubmitSection">
                        <button onClick={toggleWindowsOpen} type="button">Editar Límites</button>
                        <button className="hideOnBigScreen" type="button" onClick={() => setMobileWindowOpen(false)}>Atrás</button>
                    </div>
                </div>
            }

            {

                windowsOpen && !addLimitWindowOpen &&
                <div>
                    <h2>Editar Límites</h2>
                    {limits.map((limit, index) => (
                        <div className="limitEnableOption" key={index}>
                            <button
                                type="button"
                                className="limitEnableBtn"
                                onClick={() => toggleLimit(index)}
                            >
                                {limit.enabled && <img src="/img/check2.svg" alt="Enabled" />}
                            </button>
                            {limit.description}
                        </div>
                    ))}
                    <div className="formSubmitSection formSubmitSectionBottom">
                        <button onClick={() => setAddLimitWindowOpen(true)} type="button">+ Añadir Límites</button>
                    </div>
                </div>
            }

            {

                windowsOpen && addLimitWindowOpen &&
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const newLimit = {
                        "description" : limitDesc,
                        "enabled" : true
                    }

                    person.data.limits.push(newLimit);
                    setAddLimitWindowOpen(false);
                    setWindowsOpen(false);
                }
                }>
                    <h2>Nuevo límite</h2>
                    <div className="formSection">
                        <label htmlFor="limitDesc" required>Descripción</label>
                        <textarea onChange={(e) => setLimitDesc(e.target.value)} id="limitDesc"></textarea>
                    </div>
                    <div className="formSubmitSection">
                        <button type="submit">Guardar</button>
                        <button onClick={() => setAddLimitWindowOpen(false)} type="button">Descartar</button>
                    </div>
                </form>
            }

        </div>
    )
}

const DynamicsEdit = ({ person, setMobileWindowOpen }) => {
    const [windowsOpen, setWindowsOpen] = useState(false);

    const toggleWindowsOpen = () => {
        setWindowsOpen(prev => !prev);
    };

    const [dynamicTitle, setDynamicTitle] = useState("");
    const [dynamicDate, setDynamicDate] = useState("");
    const [dynamicTag, setDynamicTag] = useState("");
    const [dynamicNotes, setDynamicNotes] = useState("");

    return (
        <div className="dynamicsPage">
            <h1 className="hideOnBigScreen">Editar Vínculo</h1>
            {
                !windowsOpen &&
                <div>
                    <div className="editPageHeading">
                        <h2>Dinámicas</h2>
                        <button onClick={toggleWindowsOpen} className="editPageHeadingBtn" type="button">+ Añadir nueva dinámica</button>
                    </div>
                    <DynamicsPage person={person}></DynamicsPage>
                    <div className="formSubmitSection">
                        <button className="hideOnBigScreen" type="button" onClick={() => setMobileWindowOpen(false)}>Atrás</button>
                    </div>
                </div>
            }
            {
                windowsOpen &&
                <div>
                    <h2>Nueva dinámica</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const newDynamic = {
                            "date": dynamicDate,
                            "type": dynamicTag,
                            "title": dynamicTitle,
                            "description": dynamicNotes
                        };

                        person.data.dynamics.push(newDynamic);
                        toggleWindowsOpen();
                        
                    }}>
                        <div className="formSection">
                            <label htmlFor="dynamicTitle">Actividad</label>
                            <input onChange={(e) => setDynamicTitle(e.target.value)} 
                                type="text" id="dynamicTitle" placeholder="Introduce un objetivo" required></input>
                        </div>
                        <div className="formSection">
                            <label htmlFor="dynamicDate">Fecha de creación</label>
                            <input onChange={(e) => setDynamicDate(e.target.value)}  type="date" id="dynamicDate" required></input>
                        </div>
                        <div className="formSection">
                            <label htmlFor="dynamicType">Etiqueta</label>
                            <div className="selectWrap">
                                <select onChange={(e) => setDynamicTag(e.target.value)} id="dynamicType" required>
                                    <option value="Gesto afectivo">Gesto afectivo</option>
                                    <option value="Cuidado">Cuidado</option>
                                    <option value="Compromiso">Compromiso</option>
                                    <option value="Conexión">Conexión</option>
                                    <option value="Reparación">Reparación</option>
                                </select>
                            </div>
                        </div>
                        <div className="formSection">
                            <label htmlFor="dynamicDescription">Notas</label>
                            <textarea onChange={(e) => setDynamicNotes(e.target.value)} id="dynamicDescription" required></textarea>
                        </div>
                        <div className="formSubmitSection">
                            <button type="submit">Guardar</button>
                            <button type="button" onClick={toggleWindowsOpen}>Descartar</button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

const FileEdit = ({ person, setMobileWindowOpen }) => {
    return (
        <div className="fileEditPage">
            <h1 className="hideOnBigScreen">Editar Vínculo</h1>
            <div className="editPageHeading">
                <h2>Ficha</h2>
            </div>
            <form>
                <div className="formSection">
                    <label htmlFor="bwName">Nombre</label>
                    <input onChange={(e) => {person.name = e.target.value}} 
                    type="text" id="bwName" defaultValue={person.name}></input>
                </div>
                <div className="formSection">
                    <label htmlFor="bwBondType">Tipo de vínculo</label>
                    <div className="selectWrap">
                        <select onChange={(e) => {
                            person.type = e.target.value;
                            //navigate("/vinculos/" + person.type + "/" + person.id);
                        }} 
                            id="bwBondType" defaultValue={person.type}>
                            <option value="familia">Familia</option>
                            <option value="pareja">Pareja</option>
                            <option value="amistad">Amistad</option>
                            <option value="trabajo">Trabajo</option>
                            <option value="conocido">Conocido</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
                <div className="formSection">
                    <label htmlFor="bwCloseness">Niveles de cercania</label>
                    <div className="selectWrap">
                        <select onChange={(e) => {
                            person.closeness = e.target.value;
                            //navigate("/vinculos/" + person.type + "/" + person.id);
                            }}  id="bwCloseness" defaultValue={person.closeness}>
                            <option value="intimo">Íntimo</option>
                            <option value="muy cercano">Muy cercano</option>
                            <option value="cercano">Cercano</option>
                            <option value="neutral">Neutral</option>
                            <option value="distante">Distante</option>
                        </select>
                    </div>
                </div>
                <div className="formSection">
                    <label htmlFor="bwLastContact">Último contacto</label>
                    <input onChange={(e) => {person.last_contact = e.target.value}}
                    type="date" id="bwLastContact" defaultValue={person.last_contact}></input>
                </div>
                <div className="formSection">
                    <label htmlFor="bwBirthday">Cumpleaños</label>
                    <input type="date" id="bwBirthday" defaultValue={person.birthday}></input>
                </div>
                <div className="formSubmitSection">
                    <button className="hideOnBigScreen" type="button" onClick={() => setMobileWindowOpen(false)}>Atrás</button>
                </div>
            </form>
        </div>
    )
}

export const EditWindow = ({ person, toggleEditWindowVisible }) => {
    const [selectedTab, setSelectedTab] = useState("ficha");

    const changeSelectedTab = (newTab) => {
        setSelectedTab(newTab);
    };

    const [mobileWindowOpen, setMobileWindowOpen] = useState(false);

    return (
        <div className="editWindowOverlay">
            <div className="editWindow">
                <button onClick={toggleEditWindowVisible} className="editWindowCloseBtn" type="button">
                    <img width="20px" height="20px" src="/img/close.svg"></img>
                </button>
                <h1 className="editWindowHeading hide">Editar Vínculo</h1>
                <div className="editWindowBody">
                    <nav className="editWindowNav">
                        <ul>
                            <li><button type="button" onClick={() => changeSelectedTab("ficha")}
                                className={"editWindowTabBtn" + (selectedTab == "ficha" ? " active" : "")}>Ficha</button></li>
                            <li><button type="button" onClick={() => changeSelectedTab("dinamicas")}
                                className={"editWindowTabBtn" + (selectedTab == "dinamicas" ? " active" : "")}>Dinámicas</button></li>
                            <li><button type="button" onClick={() => changeSelectedTab("limites")}
                                className={"editWindowTabBtn" + (selectedTab == "limites" ? " active" : "")}>Límites</button></li>
                            <li><button type="button" onClick={() => changeSelectedTab("conflictos")}
                                className={"editWindowTabBtn" + (selectedTab == "conflictos" ? " active" : "")}>Conflictos</button></li>
                            <li><button type="button" onClick={() => changeSelectedTab("desafios")}
                                className={"editWindowTabBtn" + (selectedTab == "desafios" ? " active" : "")}>Desafíos</button></li>
                            <li><button type="button" onClick={() => changeSelectedTab("historial")}
                                className={"editWindowTabBtn" + (selectedTab == "historial" ? " active" : "")}>Historial</button></li>
                        </ul>
                    </nav>
                    <div className="editWindowContent">
                        <div className="verticalScrollSection">
                            <div className="personDataAccordion">
                                <div className="personDataAccordionElem">
                                    <button type="button"
                                    onClick={() => {setMobileWindowOpen(true); changeSelectedTab("ficha");}}
                                    className="personDataAccordionBtn">Ficha</button>
                                </div>
                                <div className="personDataAccordionElem">
                                    <button type="button"
                                    onClick={() => {setMobileWindowOpen(true); changeSelectedTab("dinamicas"); }}
                                    className="personDataAccordionBtn">Dinámicas</button>
                                </div>
                                <div className="personDataAccordionElem">
                                    <button type="button" 
                                    onClick={() => {setMobileWindowOpen(true); changeSelectedTab("limites");}}
                                    className="personDataAccordionBtn">Límites</button>
                                </div>
                                <div className="personDataAccordionElem">
                                    <button type="button" 
                                    onClick={() => {setMobileWindowOpen(true); changeSelectedTab("conflictos");}}
                                    className="personDataAccordionBtn">Conflictos</button>
                                </div>
                                <div className="personDataAccordionElem">
                                    <button type="button"
                                    onClick={() => {setMobileWindowOpen(true); changeSelectedTab("desafios");}}
                                    className="personDataAccordionBtn">Desafíos</button>
                                </div>
                                <div className="personDataAccordionElem">
                                    <button type="button"
                                    onClick={() => {setMobileWindowOpen(true); changeSelectedTab("historial");}}
                                    className="personDataAccordionBtn">Historial</button>
                                </div>
                                <div className={"mobileWindow" + (mobileWindowOpen != "" ? " mobileWindowOpen" : "")}>
                                    {(selectedTab == "ficha") && <FileEdit setMobileWindowOpen={setMobileWindowOpen} person={person}></FileEdit>}
                                    {(selectedTab == "dinamicas") && <DynamicsEdit setMobileWindowOpen={setMobileWindowOpen} person={person}></DynamicsEdit>}
                                    {(selectedTab == "limites") && <LimitsEdit setMobileWindowOpen={setMobileWindowOpen} person={person}></LimitsEdit>}
                                    {(selectedTab == "conflictos") && <ConflictEdit setMobileWindowOpen={setMobileWindowOpen} person={person}></ConflictEdit>}
                                    {(selectedTab == "desafios") && <ChallengesEdit setMobileWindowOpen={setMobileWindowOpen} person={person}></ChallengesEdit>}
                                    {(selectedTab == "historial") && <HistoryEdit setMobileWindowOpen={setMobileWindowOpen} person={person}></HistoryEdit>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
