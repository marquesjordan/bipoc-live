import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtons({ handleClick }) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab
        variant="extended"
        color="secondary"
        sx={{ mr: 1 }}
        aria-label="add"
        onClick={handleClick}>
        <AddIcon />
        Setup Company
      </Fab>
    </Box>
  );
}
