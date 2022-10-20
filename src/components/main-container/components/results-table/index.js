import * as React from 'react';

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TerminalIcon from '@mui/icons-material/Terminal';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const IconButtonAlt = styled(IconButton)(({ theme }) => ({
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  position: 'absolute',
  zIndex: 99,
  left: -18,
  '&:hover': {
    backgroundColor: theme.palette.text.primary
  }
}));

const NoResultsPreview = ({ loading, error }) => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 74px)',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    {loading ? (
      <CircularProgress color="inherit" />
    ) : (
      <>
        <Typography
          variant="button"
          display="block"
          sx={{ fontSize: '20px' }}
          gutterBottom
          align="center"
        >
          {error ? error : 'Run Query to view results!'}
        </Typography>
        <TerminalIcon sx={{ fontSize: '64px' }} />
      </>
    )}
  </Container>
);

const ResultsTable = (props) => {
  const { tableData, toggleTextBox, textboxCollapsed } = props;
  return (
    <Paper
      sx={{
        width: '100%',
        marginTop: '10px',
        borderLeft: '1px solid red',
        position: 'relative'
      }}
    >
      <IconButtonAlt
        color="primary"
        size="small"
        variant="contained"
        onClick={toggleTextBox}
      >
        {textboxCollapsed ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButtonAlt>
      {(tableData.rows.length === 0 && tableData.columns.length === 0) ||
      tableData.error != null ||
      tableData.loading ? (
        <NoResultsPreview error={tableData.error} loading={tableData.loading} />
      ) : (
        <TableContainer
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 'calc(100vh - 74px)',
            paddingLeft: '10px'
          }}
        >
          <Table
            size="small"
            sx={{ flexGrow: 1, overflow: 'scroll' }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {tableData.columns.map((column) => (
                  <TableCell key={column.id}>
                    <strong>{column.label}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {tableData.columns.map((column) => (
                      <TableCell key={index + column.id + row[column.id]}>
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default React.memo(ResultsTable);
