import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ModifyProfileMenu = ({ user }) => {

  const [name, setName] = useState(user.data.name);
  const [timeZone, setTimeZone] = useState(user.data.timeZone);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    user.data.name = name;
    user.data.timeZone = timeZone;

    alert("Perfil actualizado correctamente.");

    navigate("/configuracion");
  };

  return (
    <div className="modifyProfileMenu contentWrap">
      <h1>Modificar perfil</h1>
      <form className="profileForm" onSubmit={handleSubmit}>
        <div className="profileImage"></div>
        <div className="formSection">
          <h2>Nombre</h2>
          <input
            id="inputName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="formSection">
          <h2>Zona Horaria</h2>
          <div className="selectWrap">
            <select
              id="inputTimeZone"
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
            >
              <option value="Pacific/Midway">Midway (GMT-11:00)</option>
              <option value="America/Adak">Adak (GMT-10:00)</option>
              <option value="Pacific/Honolulu">Honolulu (GMT-10:00)</option>
              <option value="America/Anchorage">Anchorage (GMT-09:00)</option>
              <option value="America/Los_Angeles">Los Ángeles (GMT-08:00)</option>
              <option value="America/Denver">Denver (GMT-07:00)</option>
              <option value="America/Chicago">Chicago (GMT-06:00)</option>
              <option value="America/New_York">Nueva York (GMT-05:00)</option>
              <option value="America/Caracas">Caracas (GMT-04:00)</option>
              <option value="America/Santiago">Santiago (GMT-04:00)</option>
              <option value="America/Sao_Paulo">São Paulo (GMT-03:00)</option>
              <option value="Atlantic/South_Georgia">Islas Georgias del Sur (GMT-02:00)</option>
              <option value="Atlantic/Azores">Azores (GMT-01:00)</option>
              <option value="Europe/London">Londres (GMT+00:00)</option>
              <option value="Europe/Madrid">Madrid (GMT+01:00)</option>
              <option value="Europe/Berlin">Berlín (GMT+01:00)</option>
              <option value="Europe/Athens">Atenas (GMT+02:00)</option>
              <option value="Africa/Cairo">El Cairo (GMT+02:00)</option>
              <option value="Europe/Moscow">Moscú (GMT+03:00)</option>
              <option value="Asia/Tehran">Teherán (GMT+03:30)</option>
              <option value="Asia/Dubai">Dubái (GMT+04:00)</option>
              <option value="Asia/Kabul">Kabul (GMT+04:30)</option>
              <option value="Asia/Karachi">Karachi (GMT+05:00)</option>
              <option value="Asia/Kolkata">India (GMT+05:30)</option>
              <option value="Asia/Kathmandu">Katmandú (GMT+05:45)</option>
              <option value="Asia/Dhaka">Daca (GMT+06:00)</option>
              <option value="Asia/Bangkok">Bangkok (GMT+07:00)</option>
              <option value="Asia/Shanghai">Shanghái (GMT+08:00)</option>
              <option value="Asia/Tokyo">Tokio (GMT+09:00)</option>
              <option value="Australia/Sydney">Sídney (GMT+10:00)</option>
              <option value="Pacific/Noumea">Nueva Caledonia (GMT+11:00)</option>
              <option value="Pacific/Auckland">Auckland (GMT+12:00)</option>
              <option value="Pacific/Chatham">Chatham (GMT+12:45)</option>
              <option value="Pacific/Tongatapu">Tonga (GMT+13:00)</option>
              <option value="Pacific/Kiritimati">Kiritimati (GMT+14:00)</option>
            </select>
          </div>
        </div>
        <div className="formSection">
          <h2>Datos de contacto</h2>
          <label htmlFor="inputEmail">Correo</label>
          <div className="inputButtonWrap formSection">
            <input
              id="inputEmail"
              type="email"
              value={user.email}
              disabled
            />
            <NavLink to="/configuracion/modificar-perfil/verificacion"></NavLink>
          </div>
          <p className="tip">
            La dirección de correo asociada a este perfil también sirve para acceder a la cuenta y
            para recuperarla. Ve al apartado actualizar contraseña para hacer cambios.
          </p>
        </div>
        <div className="formButtons">
          <button className="formButton" type="submit">Guardar</button>
          <NavLink to="/configuracion">
            <button className="formButton" type="button">Cancelar</button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};