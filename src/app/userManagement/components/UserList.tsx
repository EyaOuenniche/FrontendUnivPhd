import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Entity } from "./types";

interface UserListProps<T extends Entity> {
  entities: T[];
  onRowClick: (entity: T) => void;
  onDelete: (entityId: number) => void;
  columns: { id: keyof T; label: string  }[];
}

// Custom styled TableCell component for the table header
const StyledTableCell = styled(TableCell)(() => ({
  backgroundColor: "#696969",
  color: "white",
}));

export default function UserList<T extends Entity>({
  entities,
  onRowClick,
  onDelete,
  columns,
}: UserListProps<T>) {
  const [filteredEntities, setFilteredEntities] = React.useState<T[]>(entities);

  const handleSearchChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      const filtered = entities.filter((entity) =>
        Object.values(entity).some((val) =>
          val.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredEntities(filtered);
    } else {
      setFilteredEntities(entities);
    }
  };

  return (
    <Paper
      sx={{ width: "90%", overflowX: "hidden", ml: "auto", mr: "auto", mt: 2 }}
    >
      <Autocomplete
        freeSolo
        options={entities.map((entity) => entity.name)}
        onInputChange={handleSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search name"
            variant="outlined"
            sx={{ mb: 2, width: "18%" }}
          />
        )}
      />
      <TableContainer
        sx={{
          maxHeight: "60vh",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        <Table
          stickyHeader
          sx={{ width: "99.9%" }}
          aria-label="entity management table"
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.id as string}>
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntities.length > 0 ? (
              filteredEntities.map((entity) => (
                <TableRow
                  key={entity.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                    borderRadius: 1,
                    "&:hover": {
                      boxShadow: 2,
                      transform: "scale(1.001)",
                      backgroundColor: "#f0f0f0",
                    },
                    "&:active": { backgroundColor: "#e0e0e0" },
                  }}
                  onClick={() => onRowClick(entity)}
                >
                  {columns.map((column) => (
                     <TableCell key={column.id as string}>
                     {typeof entity[column.id] === "boolean"
                       ? entity[column.id]
                         ? "Yes"
                         : "No"
                       : entity[column.id]}
                   </TableCell>
                  ))}
                  <TableCell>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(entity.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
