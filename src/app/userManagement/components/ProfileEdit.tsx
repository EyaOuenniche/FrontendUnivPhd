import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

interface UserProfile {
  id: number;
  password: string;
  firstName: string;
  lastName: string;
  linkedin: string;
  dob: string;
  isActive: boolean;
  displayName: string;
  isAdmin: boolean;
}

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
  displayName: '',
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

  return (
    
    <Container maxWidth="sm" sx={{ bgcolor: '#cfe8fc', p: 4 }}>
      
      <Box component="form" onSubmit={handleSubmit} sx={{  borderRadius: 1, bgcolor: 'white', p: 2 }}>
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
          label="Display Name"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
          }
          label="Is Admin"
          sx={{ color: 'black' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save
        </Button>
      </Box>
    </Container>
  
  );
}