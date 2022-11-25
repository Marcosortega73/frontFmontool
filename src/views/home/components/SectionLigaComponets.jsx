import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TableLigasClasificacionComponent from "../../client/torneos-y-competencias/base-de-datos/component/TableLigasClasificacionComponent";
import ContenedorLigas from "./ContenedorLigas";
import IconLiga from "../../../assets/images/iconos/liga.png";
import { Img } from "../../../styles-components/Layout";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{ width: "100%" }}>{children}</Box>}
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

export default function SectionLigaComponets({ torneos }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("TORNEOS PErROO", torneos);
  return (
    <Box
      sx={{ flexGrow: 1,  display: "flex"}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider",pr: 2 }}
        indicatorColor="secondary"
      >
        {torneos.map((torneo, index) => (
          <Tab
            label={torneo?.nombre}
            className="tab-opciones"
            icon={<Img width={73} height={73} src={IconLiga} alt="imagen" />}
            {...a11yProps(index)}
            key={index}
          />
        ))}
      </Tabs>
      {torneos.map((torneo, index) => (
        <TabPanel value={value} key={index+1} index={index}>
          <ContenedorLigas torneo={torneo} />
        </TabPanel>
      ))}
    </Box>
  );
}
