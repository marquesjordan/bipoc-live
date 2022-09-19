import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { storage, db, auth } from '../firebase';

export default function ActiveSwitch({ jobId, isActive = false }) {
  const [active, setActive] = React.useState(isActive);

  const handleChange = async (event) => {
    await updateDoc(doc(db, 'jobs', jobId), {
      active: event.target.checked,
    });
    // setActive(event.target.checked);
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormGroup>
        {console.log(jobId)}
        <FormControlLabel
          control={
            <Switch checked={isActive} onChange={handleChange} name="gilad" />
          }
          label={isActive ? 'Active' : 'Not Active'}
        />
      </FormGroup>
    </FormControl>
  );
}
