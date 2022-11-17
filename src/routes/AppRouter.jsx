import React, { useReducer } from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import App from "../App";

//Vistas Generales
import Home from "../views/home/Home";

//Auth
import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";

//Panel Administracion
import PanelAdministracion from "../views/panelAdmin/PanelAdministracion.jsx";
import Dashboard from "../views/panelAdmin/navegacion/Dashboard";

//Panel Perfil
import EquipoProfile from "../views/profile/panel/EquipoProfile";
import MisEstadisticas from "../views/profile/panel/MisEstadisticas";
import Logros from "../views/profile/panel/Logros";
import MisDatos from "../views/profile/panel/MisDatos";
import PantallaPrincipalProfile from "../views/profile/panel/PantallaPrincipalProfile";
import Plantilla from "../views/profile/panel/Plantilla";
import Preseleccion from "../views/profile/panel/Preseleccion";
import Tacticas from "../views/profile/panel/Tacticas";
import MisTorneos from "../views/profile/panel/MisTorneos";

//Generales
import NotFound from "../views/NotFound.jsx";
import SitioEnConstruccion from "../views/SitioEnConstruccion.jsx";
import customThemeBox from "../styles/themes/themeConfig";
import dataPanel from "../utils/panel.json";
import dataPanelSecond from "../utils/panelDataSecond.json";

import { useSelector } from "react-redux";
import ElComunitario from "../views/panelAdmin/navegacion/ElComunitario";
import Torneos from "../views/panelAdmin/navegacion/Torneos";
import Estadisticas from "../views/panelAdmin/navegacion/Estadisticas";
import Partidos from "../views/panelAdmin/navegacion/Partidos";
import Equipos from "../views/panelAdmin/navegacion/Equipos";
import Managers from "../views/panelAdmin/navegacion/Managers";
import Jugadores from "../views/panelAdmin/navegacion/Jugadores";
import Apuestas from "../views/panelAdmin/navegacion/Apuestas";
import LigasDelMundo from "../views/panelAdmin/navegacion/LigasDelMundo";
import Profile from "../views/profile/Profile";
import BaseDeDatos from "../views/client/torneos-y-competencias/base-de-datos/BaseDeDatos";
import BaseTorneosCompetencias from "../views/client/torneos-y-competencias/BaseTorneosCompetencias";
import Ligas from "../views/client/torneos-y-competencias//ligas/Ligas";
import Copas from "../views/client/torneos-y-competencias/Copas";
import ManagersCliente from "../views/client/torneos-y-competencias/ManagersCliente";
import ChangeEmail from "../views/profile/panel/common/ChangeEmail";
import Fixture from "../views/panelAdmin/navegacion/Fixture";
import Logout from "../views/auth/Logout";

const AppRouter = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  console.log("USER DEL ROUTER", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Navigate to="inicio" />} />
          <Route index path="inicio" element={<Home />} />
          <Route path="login" element={<Login data={customThemeBox} />} />
          <Route
            path="register"
            element={
              !isLoggedIn ? (
                <Register data={customThemeBox} />
              ) : (
                <Navigate to="/panelAdministracion" replace={true} />
              )
            }
          />
          <Route path="verifyMail/:token" element={<ChangeEmail />} />
          {/*NavBar*/}
          <Route path="torneos" element={<BaseTorneosCompetencias />}>
            <Route path="centro-de-ojeo" element={<BaseDeDatos />} />
            <Route path="ligas" element={<Ligas />} />
            <Route path="copas" element={<Copas />} />
            <Route path="managers" element={<ManagersCliente />} />
          </Route>

          <Route path="el-comunitario" element={<SitioEnConstruccion />} />
          <Route path="apuestas" element={<SitioEnConstruccion />} />
          <Route
            path="conviertete-en-manager"
            element={<SitioEnConstruccion />}
          />
          <Route path="ligas-del-mundo" element={<SitioEnConstruccion />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="profile"
          element={
            isLoggedIn && user && user.rol === "MANAGER" ? (
              <Profile />
            ) : user && user.rol === "ADMIN" ? (
              <Navigate to="/panelAdministracion/dashboard" replace={true} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        >
          <Route path="equipo" element={<EquipoProfile />} />
          <Route path="mis-estadisticas" element={<MisEstadisticas />} />
          <Route path="logros" element={<Logros />} />
          <Route path="mis-datos" element={<MisDatos />} />
          <Route
            path="pantalla-principal"
            element={<PantallaPrincipalProfile />}
          />
          <Route path="plantilla" element={<Plantilla />} />
          <Route path="preseleccion" element={<Preseleccion />} />
          <Route path="tacticas" element={<Tacticas />} />
          <Route path="mis-torneos" element={<MisTorneos />} />
        </Route>

        <Route
          path="panelAdministracion"
          element={
            isLoggedIn && user && user.rol === "ADMIN" ? (
              <PanelAdministracion
                data={dataPanel}
                dataSecond={dataPanelSecond}
              />
            ) : (
              <Navigate to="/login" replace={true} />
            )
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="jugadores" element={<Jugadores />} />
          <Route path="usuarios" element={<Managers />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="partidos" element={<Partidos />} />
          <Route path="torneos" element={<Torneos />} />
          <Route path="fixture" element={<Fixture />} />
          <Route path="estadisticas" element={<Estadisticas />} />

          <Route path="el-comunitario" element={<ElComunitario />} />
          <Route path="apuestas" element={<Apuestas />} />
          <Route path="ligas-del-mundo" element={<LigasDelMundo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
