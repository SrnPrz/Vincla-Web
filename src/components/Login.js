import { useState } from "react";

export const Login = ({data, person }) => {

    const [userLogginEnabled, enableUserLoggin] = useState(false);
    
    const toggleUserLoggin = () => {
        enableUserLoggin(prev => !prev);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const users = data.users;

    return (
        <div className="loginPage">
            <div className="loginContent">
                <img className="loginLogo" src="/img/vincla_logo.svg"></img>
                <h1 className="loginHeading">Cuida lo que te une</h1>
                <div className="loginPanel">
                    {
                        !userLogginEnabled &&
                        <div>
                            <p>Organiza tus vínculos, registra interacciones y mantén viva la conexión con quienes importan.</p>
                            <button onClick={toggleUserLoggin} type="button" className="loginBtn">Iniciar sesión</button>
                            <button type="button" className="loginBtn loginBtn2">Iniciar sesión con Google</button>
                        </div>
                    }
                    {
                        userLogginEnabled &&
                        <form action="/vinculos" onSubmit={
                            (e) => {
                                
                                for (var i = 0; i < users.length; i++) {
                                    if (users[i].email == email && users[i].password == password)
                                        return;
                                }

                                alert("Usuario u contraseña incorrecta.");
                                e.preventDefault();
                            }
                        }>
                            <div className="formSection">
                                <input
                                    type="email" className="loginEmail" placeholder="Correo electrónico"
                                    value = {email} onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className="formSection">
                                <input type="password" className="loginPassword" placeholder="Contraseña"
                                    value = {password} onChange={(e) => setPassword(e.target.value)}
                                ></input>
                            </div>
                            <a className="forgotPassword">¿Has olvidado tu contraseña?</a>
                            <button type="submit" className="loginBtn">Iniciar sesión</button>
                        </form>
                    }
                </div>
                <p>¿No tienes cuenta? <a><strong>Regístrate</strong></a></p>
                <div className="footer">
                    <a>Privacidad</a>
                    <a>Términos y Condiciones</a>
                    <a>Preferencias de cookies</a>
                    <a>Preguntas frecuentes</a>
                </div>
            </div>
        </div>
    )
}