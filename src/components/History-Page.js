import { useState } from 'react';

export const HistoryPage = ({ person }) => {
    const [openStates, setOpenStates] = useState(
        person.data.history.map(() => false)
    );
    
    const toggleEntry = (index) => {
        setOpenStates((prev) =>
            prev.map((state, i) => (i === index ? !state : state))
        );
    };

    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="historyPage">
            {person.data.history.length == 0 && <div className="emptyValues">Aún no hay entradas.</div>}
            {person.data.history.map((history, index) => (
                <div className={`historyEntry ${openStates[index] ? '' : 'historyEntryClosed'}`}>
                    <div className="historyEntryTop">
                        <div className="historyEntryTopLeft">
                            <span>{convertDateFormat(history.date)}</span>
                            <span>{history.activity}</span>
                        </div>
                        <div className="historyEntryTopRight">
                            <button
                                className="personEntryExpandBtn"
                                type="button"
                                onClick={() => toggleEntry(index)}
                            >
                                {openStates[index] ? '-' : '+'}
                            </button>
                        </div>

                    </div>
                    <div className="historyEntryBottom">
                        <div className="historyEntryDesc">
                            <img className="historyEntryIcon" width="20px" height="20px"
                            src={"/img/history/" + (
                                history.satisfaction == "Triste" ? "face-sad.svg" :
                                history.satisfaction == "Decepcionado" ? "face-frown.svg" :
                                history.satisfaction == "Neutral" ? "face-neutral.svg" :
                                history.satisfaction == "Conforme" ? "face-content.svg" :
                                history.satisfaction == "Contento" ? "face-smile.svg" :
                                history.satisfaction == "Feliz" ? "face-happy.svg" : ""
                            )} alt="Face"></img>
                            {history.description}
                        </div>
                        <div className="historyEntryTags">
                            {
                                history.tags.map((tag) => (
                                    <span className="historyEntryTag">{ tag }</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}  
        </div>
    );
};