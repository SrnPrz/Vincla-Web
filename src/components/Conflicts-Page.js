import { useState } from 'react';

export const ConflictPage = ({ person }) => {
    const [openStates, setOpenStates] = useState(
        person.data.conflicts.map(() => false)
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
        <div className="conflictPage">
            {person.data.conflicts.length == 0 && <div className="emptyValues">Aún no se han añadido conflictos.</div>}
            {person.data.conflicts.map((conflict, index) => (
                <div
                    key={index}
                    className={`personEntry ${openStates[index] ? '' : 'personEntryClosed'}`}
                >
                    <div className="personEntryTop">
                        <div className="personEntryTopLeft">
                            {convertDateFormat(conflict.date)}
                        </div>
                        <div className="personEntryTopMiddle">
                            <img src={ conflict.isSolved ? "/img/thumbs-up.svg" : "/img/thumbs-down.svg"} alt="Thumb" />
                            {conflict.title}
                        </div>
                        <div className="personEntryTopRight">
                            <button
                                className="personEntryExpandBtn"
                                type="button"
                                onClick={() => toggleEntry(index)}
                            >
                                {openStates[index] ? '-' : '+'}
                            </button>
                        </div>
                    </div>
                    <div className="personEntryBottom">
                        <div className="personEntryContent">
                            <div><strong>Conflicto: </strong>{conflict.description}</div>
                            <div style={{ color: "#442EC3" }}>
                                {conflict.solution !== "" && (
                                    <span>
                                    <strong>Acuerdo: </strong> {conflict.solution}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};