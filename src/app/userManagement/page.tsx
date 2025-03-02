'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import UserList from './components/UserList';
import ProfileEdit from './components/ProfileEdit';



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

function createData(
  id: number,
  password: string,
  firstName: string,
  lastName: string,
  linkedin: string,
  dob: string,
  isActive: boolean,
  displayName: string,
  isAdmin: boolean,
): UserProfile {
  return { id, password, firstName, lastName, linkedin, dob, isActive, displayName, isAdmin };
}

const users: UserProfile[] = [
  createData(1, 'password123', 'John', 'Doe', 'https://linkedin.com/in/johndoe', '1990-01-01', true, 'John Doe', false),
  createData(2, 'password456', 'Jane', 'Smith', 'https://linkedin.com/in/janesmith', '1985-05-15', false, 'Jane Smith', true),
  createData(3, 'password789', 'Alice', 'Johnson', 'https://linkedin.com/in/alicejohnson', '1992-07-20', true, 'Alice Johnson', false),
  createData(4, 'password101', 'Bob', 'Brown', 'https://linkedin.com/in/bobbrown', '1988-03-30', false, 'Bob Brown', true),
  createData(5, 'password202', 'Charlie', 'Davis', 'https://linkedin.com/in/charliedavis', '1995-11-10', true, 'Charlie Davis', false),
];

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

export default function UserManagement() {
  const [view, setView] = React.useState('list');
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);

  const handleRowClick = (user: UserProfile) => {
    setSelectedUser(user);
    setView('details');
  };

  const handleSave = (user: UserProfile) => {
    console.log('User saved:', user);
    // Add your logic here to save the user profile
    setView('list');
  };

  return (
    <div  style={{  height: '100vh',backgroundColor: '#ffff' }}>
      <Button onClick={() => setView('list')}>User List</Button>
      <Button onClick={() => setView('new')}>create new account</Button>
      {view === 'list' && <UserList users={users} onRowClick={handleRowClick} />}
      {view === 'new'  && <ProfileEdit user={ emptyUser} onSave={handleSave} />}
      {view === 'details' && selectedUser && <ProfileEdit user={selectedUser } onSave={handleSave} />}
      
     
    </div>
  );
}