import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PasswordMenu = ({user}) => {
    const verificationCode = user.data.verificationCode;
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    return (
        <div className="passwordPage contentWrap">
            <h1>Cambiar contraseña</h1>
            <p className="smallText">Protege tu cuenta con una contraseña única de 6 carácteres como mínimo</p>

            <form className="extensionLimit" onSubmit={
                (e) => {
                    e.preventDefault();

                    if (user.password != oldPassword) {
                        alert("La contraseña actual introducida no es correcta.");
                    } else if (newPassword != repeatPassword) {
                        alert("Las dos contraseñas no coinciden.");
                    } else if (newPassword.length < 6 || newPassword.length > 60) {
                        alert("La nueva contraseña debe de tener entre 6 y 60 caracteres.");
                    } else {
                        user.password = newPassword;
                        alert("Se ha actualizado la contraseña con exito.");
                        navigate("/configuracion");
                    }
                }
            }>
                <div className="formSection">
                    <h2>Contraseña actual</h2>
                    <input id="oldPassword" onChange={(e) => { setOldPassword(e.target.value) }} 
                        type="password" placeholder="Introduzca su contraseña actual" required></input>
                </div>
                
                <div className="formSection">
                   <h2>Contraseña actual</h2>
                    <input id="newPassword" onChange={(e) => { setNewPassword(e.target.value) }} 
                        type="password" placeholder="Nueva contraseña (6-60 caracteres)" required></input>
                </div>

                <div className="formSection">
                    <h2>Repetir contraseña</h2>
                    <input id="oldPassword" onChange={(e) => { setRepeatPassword(e.target.value) }} 
                        type="password" placeholder="Vuelve a escribir tu nueva contraseña" required></input>
                </div>

                <div className="formSubmitSection">
                    <button type="submit">Verificar</button>
                    <button type="button" onClick={() => navigate("/configuracion")}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}