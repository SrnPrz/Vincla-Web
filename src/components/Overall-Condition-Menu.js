export const OverallConditionMenu = ({data}) => {
    const monthSummary = data.monthSummary

    const inactiveBonds = [
        {
            "icon" : "/img/red_hourglass.svg",
            "content" : "Llevas mucho sin interactuar con Joel Trabajo. ¿Quieres borrar este vínculo de vincla?",
        }
    ];

    const networkCare = [
        {
            "icon" : "/img/trophy.svg",
            "content" : "<strong>Reto mensual:</strong> \"Da las gracias sin motivo a alguien que siempre está\""
        },
        {
            "icon" : "/img/trophy.svg",
            "content" : "<strong>Reto mensual:</strong> \"Plan sin pantallas con alguien cercano\""
        },
        {
            "icon" : "/img/red_target.svg",
            "content" : "<strong>Reto mensual:</strong> \"Proponer un plan sin hablar del conflicto\""
        }
    ]

    return (
        <div className="overallConditionMenu contentWrap">
            <h1>Estado general</h1>
            <h2>Resumen mensual</h2>
            <div className="horizontalScrollSectionWrap">
                <div className="horizontalScrollSection infoSection">
                    {
                        monthSummary.map((entry) => (
                            <div className="monthSummaryEntry">
                                <div>
                                    <img src={ entry.icon } className="monthSummaryIcon" width="36px" height="36px"></img>
                                    <span className="monthSummaryContent">{ entry.content }</span>
                                </div>
                                { entry.canBeMarked ? <button type="button" className="monthSummaryBtn">Marcar como hecho</button> : "" }
                            </div>
                        ))
                    }
                </div>
            </div>
            <h2>Vínculos inactivos</h2>
            <div className="inactiveBondsSection infoSection">
                {
                    inactiveBonds.map((entry) => (
                        <div className="entryBar">
                            <div className="entryBarLeft">
                                <img src={ entry.icon } className="entryBarIcon" width="24px" height="24px"></img>
                                <span className="entryBarContent">{ entry.content }</span>
                            </div>
                            <div className="entryBarRight">
                                <button type="button" className="entryBarIconBtn"><img src="/img/check.svg" width="24px" height="24px" alt="Check"></img></button>
                                <button type="button" className="entryBarIconBtn"><img src="/img/close.svg" width="24px" height="24px" alt="Close"></img></button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <h2>Cuida tu red</h2>

            <div className="networkCareSection infoSection">
                {
                    networkCare.map((entry) => (
                        <div className="entryBar">
                            <div className="entryBarRight">
                                <img src={ entry.icon } className="entryBarIcon" width="24px" height="24px"></img>
                                <span className="entryBarContent" dangerouslySetInnerHTML={{ __html: entry.content }}></span>
                            </div>
                            <div className="entryBarLeft">
                                <button type="button" className="entryBarBtn">Activar</button>
                                <button type="button" className="entryBarBtn">Descartar</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}