import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EducationTable = ({ education }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>School Name</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Degree
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Year Completed
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {education.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.schoolName}
              </TableCell>
              <TableCell align="right">{row.degreeName}</TableCell>
              <TableCell align="right">{row.yearCompleted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EducationTable;
