export const DynamicsPage = ({ person }) => {
    
    function convertDateFormat(dateString) {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="dynamicsPage">
            {person.data.dynamics.length == 0 && <div className="emptyValues">Aún no se han añadido dinámicas.</div>}
            {person.data.dynamics.map((dynamic) => (
                <div className="personEntry">
                    <div className="personEntryTop">
                        <div className="personEntryTopLeft">
                            {convertDateFormat(dynamic.date)}
                        </div>
                        <div className="personEntryTopRight">
                            <img src={ "/img/dynamics/" +
                                (dynamic.type == "Gesto afectivo" ? "heart.svg" :
                                dynamic.type == "Cuidado" ? "health.svg" :
                                dynamic.type == "Compromiso" ? "lock.svg" :
                                dynamic.type == "Conexión" ? "chain.svg" :
                                dynamic.type == "Reparación" ? "feather.svg" : ""
                            )}></img>
                            { dynamic.type }
                        </div>
                    </div>
                    <div className="personEntryBottom">
                        <div className="personEntryContent">
                            <h3>{dynamic.title}</h3>
                            <p>{dynamic.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}