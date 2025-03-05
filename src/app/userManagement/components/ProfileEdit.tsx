import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { UserProfile} from './types';



interface ProfileProps {
  user: UserProfile;
  onSave: (user: UserProfile) => void;
}

const emptyUser: UserProfile = {
  id: 0,
  password: '',
  firstName: '',
  lastName: '',
  linkedin: '',
  dob: '',
  isActive: false,
  name: '',
  isAdmin: false,
};

export default function ProfileEdit({ user = emptyUser, onSave }: ProfileProps) {
  const [formData, setFormData] = React.useState<UserProfile>(user);

  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  const handleCancel = () => {
  console.log('cancel button clicked' );
    
  };
  return (
    
    <Container maxWidth="sm"component={Paper} elevation={5}>
      
      <Box component="form" onSubmit={handleSubmit} sx={{  p:2 }}>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="LinkedIn"
          name="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          }
          label="Is Active"
          sx={{ color: 'black' }}
        />
        <TextField
          label="Display name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          // value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
          }
          label="Is Admin"
          sx={{ color: 'black' }}
        /> */}
        <Box >
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save
        </Button>
        <Button type='button' variant="contained" color="error" onClick={handleCancel} sx={{ mt: 2 ,ml:2}}> 
          cancel
        </Button>
        </Box>
      </Box>
    </Container>
  
  );
  }