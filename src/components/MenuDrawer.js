import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoritesIcon from '@mui/icons-material/Favorite';
import BusinessIcon from '@mui/icons-material/Business';
import PeoplesIcon from '@mui/icons-material/People';
import Hamburger from './svg/Hamburger';
import { Link } from 'react-router-dom';

export default function MenuDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const getIcon = (title) => {
    return;
  };

  const MenuItems = [
    { text: 'Home', link: '/' },
    { text: 'Account', link: '/profile' },
    { text: 'Company', link: '/company' },
    { text: 'Messages', link: '/messages' },
    { text: 'Jobs', link: '/jobs' },
    { text: 'Applicants', link: '/applicants' },
    { text: 'Settings', link: '/settings' },
    { text: 'Connections', link: '/connections' },
    { text: 'Notifications', link: '/notifications' },
    { text: 'Favorites', link: '/favorites' },
  ];

  const list = (anchor) => (
    <Box
      style={{ backgroundColor: '#5e76bf', color: '#ffffff' }}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {MenuItems.map(({ text, link }, index) => (
          <Link
            key={index}
            to={link}
            style={{ textDecoration: 'none', color: '#fff' }}>
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: '#ffffff' }}>
                  {
                    [
                      <HomeIcon />,
                      <AccountBoxIcon />,
                      <BusinessIcon />,
                      <MailIcon />,
                      <WorkIcon />,
                      <PeoplesIcon />,
                      <SettingsIcon />,
                      <PeopleIcon />,
                      <NotificationsIcon />,
                      <FavoritesIcon />,
                    ][index]
                  }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon style={{ color: '#ffffff' }}>
                {index % 2 === 0 ? <PeopleIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button onClick={toggleDrawer('left', true)}>
          <Hamburger />
        </Button>
        <Drawer
          className="left_drawer"
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
