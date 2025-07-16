import { useState } from "react";

export const ChallengesPage = ({ person }) => {

    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    const [activeChallengeList, setActiveChallengeList] = useState(person.data.challenges.active);
    
    const removeActiveChallenge = (index) => {
        var newActiveChallengeList = [...activeChallengeList];
        newActiveChallengeList.splice(index, 1);
        person.data.challenges.active = newActiveChallengeList;
        setActiveChallengeList(newActiveChallengeList);
    }

    const [suggestedChallengeList, setSuggestedChallengeList] = useState(person.data.challenges.suggestions);

    const removeSuggestedChallenge = (index) => {
        var newSuggestedChallengeList = [...suggestedChallengeList];
        newSuggestedChallengeList.splice(index, 1);
        person.data.challenges.suggestions = newSuggestedChallengeList;
        setSuggestedChallengeList(newSuggestedChallengeList);
    }

    return (
        <div className="challengesPage">
            <h2>Desafíos activos</h2>
            <div className="infoSection horizontalScrollSectionWrap">
                <div className="horizontalScrollSection">
                    {person.data.challenges.active.length == 0 && <div className="emptyValues">Aún no se han añadido desafíos personalizados.</div>}
                    {person.data.challenges.active.map((challenge, index) => (
                        <div className="personEntry personEntryPadded">
                            <div className="personEntryTop personEntryPaddedTop">
                                <div className="personEntryTopLeft">
                                    <img src="/img/blue_target.svg" width="32px" height="32px"></img>
                                    {challenge.title}
                                </div>
                            </div>
                            <div className="personEntryBottom">
                                <div className="personEntryContent">
                                    <div><strong>Acción: </strong>{challenge.action}</div>
                                    <div><strong>Plazo: </strong>{convertDateFormat(challenge.date)}</div>
                                    <div className="personEntryBtns">
                                        <button onClick={(e) => removeActiveChallenge(index)} type="button"><img src="/img/check.svg" width="24px" height="24px" alt="Check"></img>Marcar como hecho</button>
                                        <button onClick={(e) => removeActiveChallenge(index)} type="button"><img src="/img/close.svg" width="24px" height="24px" alt="Close"></img>Descartar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <h2>Desafíos sugeridos por vincla</h2>
            <div className="infoSection horizontalScrollSectionWrap">
                <div className="horizontalScrollSection">
                    {person.data.challenges.suggestions.length == 0 && <div className="emptyValues">Aún no hay desafíos sugeridos.</div>}
                    {person.data.challenges.suggestions.map((challenge, index) => (
                        <div className="personEntry personEntryPadded">
                            <div className="personEntryTop personEntryPaddedTop">
                                <div className="personEntryTopLeft">
                                    <img src="/img/red_target2.svg" width="32px" height="32px"></img>
                                    {challenge.title}
                                </div>
                            </div>
                            <div className="personEntryBottom">
                                <div className="personEntryContent">
                                    <div><strong>Acción: </strong>{challenge.action}</div>
                                    <div><strong>Plazo: </strong>{challenge.date}</div>
                                    <div className="personEntryBtns">
                                        <button onClick={(e) => removeSuggestedChallenge(index)} type="button"><img src="/img/check.svg" width="24px" height="24px" alt="Check"></img>Marcar como hecho</button>
                                        <button onClick={(e) => removeSuggestedChallenge(index)} type="button"><img src="/img/close.svg" width="24px" height="24px" alt="Close"></img>Descartar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};