import * as React from 'react';
import {
  TextField,
  Paper,
  Button,
  CircularProgress,
  MenuItem
} from '@mui/material';

import { dummyQueries } from '../../../../api/constants';

const QueryEditor = (props) => {
  const { query, setQuery, submitQuery, loading, textboxCollapsed } = props;

  const onQueryChange = React.useCallback(
    (e) => {
      setQuery({ preloadedIndex: -1, text: e.target.value });
    },
    [setQuery]
  );

  const onSelectQuery = React.useCallback(
    (e) => {
      setQuery({
        preloadedIndex: e.target.value,
        text: dummyQueries[e.target.value]
      });
    },
    [setQuery]
  );

  return (
    <Paper
      sx={{
        width: '100%',
        marginTop: '10px',
        maxHeight: 'calc(100vh - 74px)',
        padding: '10px',
        display: textboxCollapsed ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      <TextField
        select
        fullWidth
        label="Select a pre defined query"
        value={query.preloadedIndex === -1 ? '' : query.preloadedIndex}
        onChange={onSelectQuery}
      >
        {dummyQueries.map((option, i) => (
          <MenuItem key={option} value={i}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ flexGrow: 1, overflowY: 'scroll', marginTop: '10px' }}
        multiline
        fullWidth
        minRows={4}
        placeholder={'Enter SQL query here!'}
        value={query.text}
        onChange={onQueryChange}
      />
      <Button
        onClick={submitQuery}
        disabled={loading || query.text.length === 0}
        variant="contained"
        color="success"
        size="large"
        sx={{ margin: '10px' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Query'}
      </Button>
    </Paper>
  );
};

export default QueryEditor;
