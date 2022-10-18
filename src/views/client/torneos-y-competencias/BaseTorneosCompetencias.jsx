import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { AppBar, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import Portada from "../../../assets/images/banners/portadacofm.png";
import { Img } from "../../../styles-components/Layout";

import "./BaseTorneosCompetencias.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Paper>{children}</Paper>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const BaseTorneosCompetencias = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="header">
          <Img src={Portada} alt="Portada" />
        </Box>

        <Box sx={{ bgcolor: "background.paper", width: "90%", mt:2}}>
          <AppBar position="static" className="appTabsGroup">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="full width tabs example"
              indicatorColor="secondary"
              className="tabsGroup"
              
            >
              <Tab
                className="tab-opciones"
                label="Ligas"
                {...a11yProps(0)}
                component={Link}
                to="/torneos/ligas"
              />
              <Tab
                className="tab-opciones"
                label="Copas"
                {...a11yProps(1)}
                component={Link}
                to="/torneos/copas"
              />
              <Tab
                className="tab-opciones"
                label="Base de Datos"
                {...a11yProps(2)}
                component={Link}
                to="/torneos/base-de-datos"

              />
               <Tab
                className="tab-opciones"
                label="Managers"
                {...a11yProps(3)}
                component={Link}
                to="/torneos/managers"
              />
            </Tabs>
          </AppBar>
         {/*  <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel> */}
             <Outlet />
        </Box>
        <Box component="main">
       
        </Box>
      </Box>
    </>
  );
};

export default BaseTorneosCompetencias;
