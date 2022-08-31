import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoritesIcon from '@mui/icons-material/Favorite';

export default function CompanyCard() {
  return (
    <Card sx={{ widht: '100%', margin: 1.2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        style={{ objectFit: 'revert' }}
        src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Company Name
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <FavoritesIcon />
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
