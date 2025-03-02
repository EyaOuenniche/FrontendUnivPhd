import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface UserData {
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

interface UserListProps {
  users: UserData[];
  onRowClick: (user: UserData) => void;
}

export default function UserList({ users, onRowClick }: UserListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user management table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>LinkedIn</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Is Active</TableCell>
            <TableCell>Display Name</TableCell>
            <TableCell>Is Admin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#f5f5f5' },
                '&:active': { backgroundColor: '#e0e0e0' },
              }}
              onClick={() => onRowClick(user)}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.password}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell><a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></TableCell>
              <TableCell>{user.dob}</TableCell>
              <TableCell sx={{ backgroundColor: user.isActive ? '#2E8B57' : '#FF0000' }}>{user.isActive ? 'Yes' : 'No'}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}