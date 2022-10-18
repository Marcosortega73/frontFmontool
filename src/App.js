import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/navbar/menu/Navbar";

//PRUEBA PARA DESABILITAR NAV BAR
import { useDispatch } from "react-redux";
import { getRegiones } from "./redux/regionesSlice";

function App() {
  
const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRegiones());
  }
  ,[dispatch]);


  //PRUEBA PARA DESABILITAR NAV BAR

  return (
    <>
      <header
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#1A2027",
          maxWidth: "100%",
        }}
      >
          <Navbar />
      </header>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <Outlet />
      </section>
    </>
  );
}

export default App;
