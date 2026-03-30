import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const drawerList = [
  { text: "Home", id: "/" },
  { text: "Fashion", id: "fashion" },
  { text: "Appliances", id: "appliances" },
  { text: "Bags", id: "bags" },
  { text: "Footwear", id: "footwear" },
  { text: "Groceries", id: "groceries" },
  { text: "Beauty", id: "beauty" },
  { text: "Wellness", id: "wellness" },
  { text: "Jewellery", id: "jewellery" }
];

const CategoryPanel = ({ open, setOpen }) => {

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}   // closes when clicking backdrop
      onOpen={toggleDrawer(true)}
    >
      <Box
        sx={{
          width: 280,
          height: '100%',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <Typography variant="h6">
            Shop By Categories
          </Typography>

          <IconButton onClick={toggleDrawer(false)}>
            <IoClose />
          </IconButton>
        </Box>

        {/* List */}
        <List>
          {drawerList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                component={Link}
                to={item.id === "/" ? "/" : `/category/${item.id}`}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Box>
    </SwipeableDrawer>
  );
};

export default CategoryPanel;
