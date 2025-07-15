export const LimitsPage = ({ person }) => {
    return (
        <div className="limitsPage">
            {person.data.limits.length == 0 && <div className="emptyValues">Aún no se han establecido límites.</div>}
            {person.data.limits.map((limit) => (
                limit.enabled &&
                <div className="entryBar">
                    {limit.description}
                </div>
            ))}
        </div>
    )
}