import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SlotList from "../../pages/SlotList";

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
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function HorizontalTabsClient() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Onglets client réservation"
        variant="scrollable"
        scrollButtons="auto"
        textColor="#92400E"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#92400E", // ligne active sous l'onglet
            height: 3, // épaisseur optionnelle
          },
        }}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          minWidth: 250,
          bgcolor: "#f9f9f9",
        }}
      >
        <Tab label="Créneaux" {...a11yProps(0)} />
        <Tab label="Mes Réservations" {...a11yProps(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <SlotList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Liste de vos réservations, avec options de modification/annulation.
      </TabPanel>
    </Box>
  );
}
