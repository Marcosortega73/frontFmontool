import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CarouselGoleadoresComponent from "./CarouselGoleadoresComponent";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CarouselAsistenciasComponent from "./CarouselAsistenciasComponent";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, maxWidth:"70vw" }}>{children}</Box>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function EstadisticasComponent({torneo}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "primary.main",
        display: "flex",
        height: "auto",
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        indicatorColor="secondary"
        className="tabsGroup"

        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab className="tab-opciones" 
        icon={<SportsSoccerIcon />}
        label="Goleadores" {...a11yProps(0)} />
        <Tab className="tab-opciones" label="Asistencias" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
          <CarouselGoleadoresComponent torneo={torneo}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CarouselAsistenciasComponent torneo={torneo}/>
      </TabPanel>
    </Box>
  );
}
