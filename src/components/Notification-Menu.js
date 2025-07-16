import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotificationMenu = ({ user }) => {
    const verificationCode = user.data.verificationCode;
    const navigate = useNavigate();

    const [notifFreq, setNotifFreq] = useState(user.settings.notificationFreq);
    const [notifType, setNotifType] = useState(user.settings.notificationType);
    const [silentMode, setSilentMode] = useState(user.settings.silentMode);

    return (
        <div className="notificationPage contentWrap">
            <h1>Configuración de notificaciones</h1>
            <p className="smallText">Gestiona las notificaciones que recibes de vincla</p>

            <form className="extensionLimit" onSubmit={
                (e) => {
                    e.preventDefault();
                    user.settings.notificationFreq = notifFreq;
                    user.settings.notificationType = notifType;
                    user.settings.silentMode = silentMode;
                    navigate("/configuracion");
                }
            }>
                <div className="formSection">
                    <h2>Frecuencia de recordatorios</h2>
                    <div className="selectWrap">
                        <select id="notifFreq" value={notifFreq} onChange={(e) => setNotifFreq(e.target.value)}>
                            <option value="Diaria">Diaria</option>
                            <option value="Semanal">Semanal</option>
                            <option value="Solo cumpleaños">Solo cumpleaños</option>
                        </select>
                    </div>
                </div>
                <div className="formSection">
                    <h2>Tipo de avisos</h2>
                    <div className="selectWrap">
                        <select id="notifFreq" value={notifType} onChange={(e) => setNotifType(e.target.value)}>
                            <option value="Cumpleanos">Cumpleaños</option>
                            <option value="Tiempo sin contacto">Tiempo sin contacto</option>
                            <option value="Conflictos sin cerrar">Conflictos sin cerrar</option>
                            <option value="Reencuentros marcados">Reencuentros marcados</option>
                        </select>
                    </div>
                </div>

                <div className="formCheckboxSection">
                    <label htmlFor="silentMode">Modo silencioso</label>
                    <input id="silentMode" checked={silentMode} type="checkbox" onChange={() => setSilentMode(!silentMode)}/>
                </div>

                <div className="formSubmitSection">
                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={() => navigate("/configuracion")}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}