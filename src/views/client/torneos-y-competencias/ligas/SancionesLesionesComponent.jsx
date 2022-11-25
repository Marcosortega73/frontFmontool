import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TablaSancionados from "./TablaSancionados";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SancionesLesionesComponent({ equipos,torneo }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          allowScrollButtonsMobile
          sx={{
            "& .MuiTabs-scrollButtons": {
              color: "secondary.main",
            },
          }}
        >
          {equipos.map((equipo, index) => {
            return (
              <Tab
                key={index}
                label={equipo.nombre_corto}
                className="tab-opciones"
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </Box>
      {equipos.map((equipo, index) => {
        return (
          <TabPanel key={index} value={value} index={index}>
            <TablaSancionados equipo_id={equipo?.id} torneo={torneo} />
          </TabPanel>
        );
      })}
    </Box>
  );
}
