import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const VerificationMenu = ({user}) => {
    const verificationCode = user.data.verificationCode;
    const navigate = useNavigate();

    const [code, setCode] = useState("");

    return (
        <div className="verificationMenu contentWrap">
            <h1>Verificación de seguridad</h1>

            <form className="extensionLimit" onSubmit={
                (e) => {
                    e.preventDefault();
                    if (verificationCode == code) {
                        alert("Correo verificado correctamente.");
                        navigate("/configuracion/modificar-perfil");
                    } else {
                        alert("El código introducido no es correcto.");
                    }
                }
            }>
                <h2>Antes de cambiar tu correo, debemos verificar que eres tú</h2>
                <p className="bigTip">Enviaremos un código a tu correo electrónico actual</p>
                <div className="profileVerifyBox">
                    <label>Envíar código</label>
                    <span>{user.email}</span>
                </div>
                <p className="tip">¿Necesitas ayuda? <a>Contacta con nosotros</a></p>
                <p className="bigTip">Introduce el código que has recibido en tu correo</p>
                <div className="formSection">
                    <input onChange={(e) => { setCode(e.target.value) }} type="number" placeholder="Introduce el código" required></input>
                </div>
                <div className="formSubmitSection">
                    <button type="submit">Verificar</button>
                </div>
            </form>
        </div>
    )
}