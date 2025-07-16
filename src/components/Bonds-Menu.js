import { NavLink, useLocation, Routes, Route } from "react-router-dom";
import { PersonCards } from "./Person-Cards-Menu";
import { PersonDataMenu } from "./Person-Data-Menu";

export const BondsMenu = ({data, toggleUpdateData}) => {

    const bonds = data.bonds;

    return (
        <Routes>
            {["", "todos", "familia", "pareja", "amistad", "trabajo", "conocido", "otro"].map(
                path => <Route path={"/" + path} element={<PersonCards data={data} toggleUpdateData={toggleUpdateData} filter={path != "" ? path : "todos"} />} />)
            }
            {bonds.map((person, index) => (
                <Route
                    key={person.id}
                    path={`/persona/${person.id}/*`}
                    element={<PersonDataMenu bonds={bonds} toggleUpdateData={toggleUpdateData} index={index} />}
                />
            ))}
        </Routes>
    )
}