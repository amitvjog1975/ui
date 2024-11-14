import React, {useState} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';   


function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openMasters, setOpenMasters] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };
  return (
    <List>
      <ListItem button onClick={handleDashboardClick}>
        <ListItemIcon>
          {/* Dashboard Icon */}
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        {openDashboard ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openDashboard} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>   

            <ListItemIcon>
              {/* Dashboard Submenu Icon */}
            </ListItemIcon>
            <ListItemText primary="Dashboard Submenu 1" />
          </ListItem>
          {/* ...other dashboard submenus... */}
        </List>
      </Collapse>

      {/* Similar structure for Masters and Reports */}

      {/* ...other menu items... */}
    </List>
  );
}

export default Sidebar;