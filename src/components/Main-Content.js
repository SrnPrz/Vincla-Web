import { SideMenu } from './Side-Menu';
import { BondsMenu } from './Bonds-Menu';
import { Routes, Route } from 'react-router-dom';
import { RemindersMenu } from './Reminders-Menu';
import { OverallConditionMenu } from './Overall-Condition-Menu';
import { SettingsMenu } from './Settings-Menu';
import { ModifyProfileMenu } from './Modify-Profile-Menu';
import { VerificationMenu } from './Verification-Menu';
import { PasswordMenu } from './Password-Menu';
import { NotificationMenu } from './Notification-Menu';

export const MainContent = ({data, menuVisible}) => {

    const loggedUserIndex = 0;

    return (
        <main id="mainContent">
            <div className={"sideMenuWrap" + (!menuVisible ? " hideOnSmallScreen" : "")}>
                <SideMenu></SideMenu>
            </div>
            <div id="pageContent">
                <Routes>
                    <Route path="/" element={ <BondsMenu data={data}></BondsMenu> }></Route>
                    <Route path="/vinculos/*" element={ <BondsMenu data={data}></BondsMenu> }></Route>
                    <Route path="/recordatorios" element={ <RemindersMenu data={data}></RemindersMenu> }></Route>
                    <Route path="/estado-general" element={ <OverallConditionMenu data={data}></OverallConditionMenu> }></Route>
                    <Route path="/configuracion" element={ <SettingsMenu user={data.users[loggedUserIndex]}></SettingsMenu> }></Route>
                    <Route path="/configuracion/modificar-perfil" element={ <ModifyProfileMenu user={data.users[loggedUserIndex]}></ModifyProfileMenu> }></Route>
                    <Route path="/configuracion/modificar-perfil/verificacion" element={ <VerificationMenu user={data.users[loggedUserIndex]}></VerificationMenu> }></Route>
                    <Route path="/configuracion/cambiar-contrasena" element={ <PasswordMenu user={data.users[loggedUserIndex]}></PasswordMenu> }></Route>
                    <Route path="/configuracion/notificaciones" element={ <NotificationMenu user={data.users[loggedUserIndex]}></NotificationMenu> }></Route>
                    <Route path="*" element={ <div className="emptyValues">No se ha encontrado la página indicada.</div> }></Route>
                </Routes>
            </div>
        </main>
    )
}