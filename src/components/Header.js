import { Notifications } from './Notifications';
import { useState } from 'react';

export const Header = ({isLogged, setMenuVisible }) => {
    const [notifVisible, setNotifVisible] = useState(false);

    const toggleNotif = () => {
        setNotifVisible(prev => !prev);
    };

    return (
        <header>
            {isLogged && <button className="burgerMenuBtn hideOnBigScreen" onClick={setMenuVisible}>
                <img src="/img/burger-menu.svg" width="36px" height="36px"></img>
            </button>}
            <div>
                <a href=".">
                    <img src="/img/vincla_logo.svg"></img>
                </a>
            </div>
            {isLogged && <div className="hideOnSmallScreen">
                <button className="notification-btn" onClick={toggleNotif}>
                    <img src="/img/notifications.svg"></img>
                    {notifVisible && <Notifications></Notifications>}
                </button>
                <button className="profile-btn">
                    <img src="/img/profile_pic.svg"></img>
                </button>
            </div>
            }
        </header>
    )
}