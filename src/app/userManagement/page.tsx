'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import UserList from './components/UserList';
import ProfileEdit from './components/ProfileEdit';
import { UserProfile, University } from './components/types';

const userColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'password', label: 'Password' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'dob', label: 'Date of Birth' },
  { id: 'isActive', label: 'Is Active' },
  { id: 'isAdmin', label: 'Is Admin' },
];

const universityColumns = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'location', label: 'Location' },
  { id: 'established', label: 'Established' },
];

const initialUsers: UserProfile[] = [
  { id: 1, password: 'password123', firstName: 'John', lastName: 'Doe', linkedin: 'https://linkedin.com/in/johndoe', dob: '1990-01-01', isActive: true, name: 'John Doe', isAdmin: false },
  { id: 2, password: 'password456', firstName: 'Jane', lastName: 'Smith', linkedin: 'https://linkedin.com/in/janesmith', dob: '1985-05-15', isActive: false, name: 'Jane Smith', isAdmin: false },
  { id: 3, password: 'password789', firstName: 'Alice', lastName: 'Johnson', linkedin: 'https://linkedin.com/in/alicejohnson', dob: '1992-07-20', isActive: true, name: 'Alice Johnson', isAdmin: false },
  { id: 4, password: 'password101', firstName: 'Bob', lastName: 'Brown', linkedin: 'https://linkedin.com/in/bobbrown', dob: '1988-03-30', isActive: false, name: 'Bob Brown', isAdmin: true },
  { id: 5, password: 'password202', firstName: 'Charlie', lastName: 'Davis', linkedin: 'https://linkedin.com/in/charliedavis', dob: '1995-11-10', isActive: true, name: 'Charlie Davis', isAdmin: false },
  { id: 6, password: 'password207', firstName: 'Hammadi', lastName: 'Davis', linkedin: 'https://linkedin.com/in/charliedavis', dob: '1996-11-10', isActive: true, name: 'Ezzedine', isAdmin: false },
];

const universities: University[] = [
  { id: 1, name: 'Harvard University', location: 'Cambridge, MA', established: 1636 },
  { id: 2, name: 'Stanford University', location: 'Stanford, CA', established: 1885 },
];

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

export default function UserManagement() {
  const [view, setView] = React.useState('list');
  const [selectedUser, setSelectedUser] = React.useState<UserProfile | null>(null);
  const [users, setUsers] = React.useState<UserProfile[]>(initialUsers);
  const [selectedUniversity, setSelectedUniversity] = React.useState<University | null>(null);
  const [universitiesList, setUniversitiesList] = React.useState<University[]>(universities);

  const handleRowClick = (user: UserProfile) => {
    setSelectedUser(user);
    setView('details');
  };

  const handleSave = (user: UserProfile) => {
    console.log('User saved:', user);
    // Add your logic here to save the user profile
    setView('list');
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleUniversityRowClick = (university: University) => {
    setSelectedUniversity(university);
    setView('universityDetails');
  };

  const handleUniversityDelete = (universityId: number) => {
    setUniversitiesList(universitiesList.filter(university => university.id !== universityId));
  };

  return (
    <div style={{ height: '100vh', backgroundColor: '#ffff' }}>
      <Button onClick={() => setView('list')}>User List</Button>
      <Button onClick={() => setView('new')}>Create New Account</Button>
      <Button onClick={() => setView('universityList')}>University List</Button>
      {view === 'list' && <UserList entities={users} onRowClick={handleRowClick} onDelete={handleDelete} columns={userColumns} />}
      {view === 'new' && <ProfileEdit user={emptyUser} onSave={handleSave} />}
      {view === 'details' && selectedUser && <ProfileEdit user={selectedUser} onSave={handleSave} />}
      {view === 'universityList' && <UserList entities={universitiesList} onRowClick={handleUniversityRowClick} onDelete={handleUniversityDelete} columns={universityColumns} />}
      {view === 'universityDetails' && selectedUniversity && (
        <div>
          <h2>{selectedUniversity.name}</h2>
          <p>Location: {selectedUniversity.location}</p>
          <p>Established: {selectedUniversity.established}</p>
        </div>
      )}
    </div>
  );
}