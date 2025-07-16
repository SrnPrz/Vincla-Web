import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const SettingsMenu = ({ user }) => {
    return (
        <div className='settingsMenu contentWrap'>
            <h1>Configuración</h1>
            <h2>Cuenta</h2>
            <div className="infoSection">
                <NavLink to="/configuracion/modificar-perfil" className="infoEntry settingOption">
                    <div className="settingContent">
                        <span className='settingName'>
                            <img className="settingIcon" src="/img/edit-profile.svg"></img>{user.data.name}
                        </span>
                        <span className='settingDesc'>Modificar datos personales e información de contacto</span>
                    </div>
                </NavLink>
                <NavLink to="/configuracion/cambiar-contrasena" className="infoEntry settingOption">
                    <div className="settingContent">
                        <span className='settingName'>
                            <img className="settingIcon" src="/img/password.svg"></img>Actualizar Contraseña
                        </span>
                        <span className='settingDesc'>Actualiza la contraseña de la cuenta</span>
                    </div>
                </NavLink>
                <div className="infoEntry settingOption">
                    <div className="settingContent">
                        <span className='settingName'>
                            <img className="settingIcon" src="/img/edit-profile.svg"></img>Idiomas
                        </span>
                        <span className='settingDesc'>Configura el idioma de la cuenta</span>
                    </div>
                </div>
                <div className="infoEntry settingOption">
                    <div className="settingContent">
                        <span className='settingName'>
                            <img className="settingIcon" src="/img/trashcan.svg"></img>Borrar cuenta
                        </span>
                        <span className='settingDesc'>Borra tu cuenta de vincla</span>
                    </div>
                </div>
            </div>
            <h2>Preferencias</h2>
            <div className="infoSection">
                <NavLink to="/configuracion/notificaciones" className="infoEntry settingOption">
                    <div className="settingContent">
                        <span className='settingName'>
                            <img className="settingIcon" src="/img/notification.svg"></img>Configuración de las notificaciones
                        </span>
                        <span className='settingDesc'>Gestiona las notificaciones que recibes de vincla</span>
                    </div>
                </NavLink>
            </div>
            <h2>Privacidad</h2>
            <div className="infoSection">
                <div className="infoEntry settingOption">
                    <div className="settingContent">
                        <span className='settingName'>
                            <img className="settingIcon" src="/img/clock2.svg"></img>Acuerdo de privacidad
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}