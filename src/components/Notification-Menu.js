import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotificationMenu = ({ user }) => {
    const verificationCode = user.data.verificationCode;
    const navigate = useNavigate();

    const [notifFreq, setNotifFreq] = useState(user.settings.notificationFreq);
    const [notifTypes, setNotifTypes] = useState({...user.settings.notificationTypes});
    const [silentMode, setSilentMode] = useState(user.settings.silentMode);

    const toggleNotifTypes = (key, value) => {
        const newNotifType = { ...notifTypes };
        newNotifType[key] = value;
        setNotifTypes(newNotifType);
    }

    return (
        <div className="notificationPage contentWrap">
            <h1>Configuración de notificaciones</h1>
            <p className="smallText">Gestiona las notificaciones que recibes de vincla</p>

            <form className="extensionLimit" onSubmit={
                (e) => {
                    e.preventDefault();
                    user.settings.notificationFreq = notifFreq;
                    user.settings.notificationTypes = notifTypes;
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

                    <div className="formCheckboxSection">
                        <input id="birthday" checked={notifTypes["birthday"]} type="checkbox"
                            onChange={() => toggleNotifTypes("birthday", !notifTypes["birthday"])} />
                        <label htmlFor="birthday">Cumpleaños</label>
                    </div>
                    <div className="formCheckboxSection">
                        <input id="noContTime" checked={notifTypes["noContTime"]} type="checkbox"
                            onChange={() => toggleNotifTypes("noContTime", !notifTypes["noContTime"])} />
                        <label htmlFor="noContTime">Tiempo sin contacto</label>
                    </div>
                    <div className="formCheckboxSection">
                        <input id="pendingConflcit" checked={notifTypes["pendingConflcit"]} type="checkbox"
                            onChange={() => toggleNotifTypes("pendingConflcit", !notifTypes["pendingConflcit"])} />
                        <label htmlFor="pendingConflcit">Conflictos sin cerrar</label>
                    </div>
                    <div className="formCheckboxSection">
                        <input id="markedReun" checked={notifTypes["markedReun"]} type="checkbox"
                            onChange={() => toggleNotifTypes("markedReun", !notifTypes["markedReun"])} />
                        <label htmlFor="markedReun">Reencuentros marcados</label>
                    </div>
                </div >

                <div className="formSection">
                    <h2>Modo silencioso</h2>
                    <div className="formCheckboxSection">
                        <input id="silentMode" checked={silentMode} type="checkbox" onChange={() => setSilentMode(!silentMode)} />
                        <label htmlFor="silentMode">Activar modo silencioso</label>
                    </div>
                </div>

                <div className="formSubmitSection">
                    <button type="submit">Actualizar</button>
                    <button type="button" onClick={() => navigate("/configuracion")}>Cancelar</button>
                </div>
            </form >
        </div >
    )
}