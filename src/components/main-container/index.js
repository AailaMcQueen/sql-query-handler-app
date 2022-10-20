import * as React from 'react';
import { Box, CssBaseline, Grid, styled } from '@mui/material';

import { QueryEditor, ResultsTable } from './components';
import { runQuery } from '../../api';

const emptyTableData = {
  columns: [],
  rows: [],
  error: null,
  loading: false
};

const AnimatedGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create(['all', 'transform'], {
    duration: theme.transitions.duration.standard
  })
}));

const MainContainer = () => {
  const [tableData, setTableData] = React.useState(emptyTableData);
  const [query, setQuery] = React.useState({
    text: '',
    preloadedIndex: -1
  });
  const [textboxCollapsed, setTextBoxCollapse] = React.useState(false);

  const submitQuery = React.useCallback(() => {
    setTableData({ ...emptyTableData, loading: true });
    runQuery(query.text, query.preloadedIndex)
      .then((res) => setTableData({ ...emptyTableData, ...res }))
      .catch((error) =>
        setTableData({
          ...emptyTableData,
          error
        })
      );
  }, [query]);

  const toggleTextBox = React.useCallback(() => {
    setTextBoxCollapse((prevState) => !prevState);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Grid sx={{ height: '100%', paddingX: '10px' }} container spacing={2}>
        <AnimatedGrid item xs={textboxCollapsed ? 1 : 5}>
          <QueryEditor
            query={query}
            setQuery={setQuery}
            submitQuery={submitQuery}
            loading={tableData.loading}
            textboxCollapsed={textboxCollapsed}
          />
        </AnimatedGrid>

        <AnimatedGrid item xs={textboxCollapsed ? 11 : 7}>
          <ResultsTable
            tableData={tableData}
            toggleTextBox={toggleTextBox}
            textboxCollapsed={textboxCollapsed}
          />
        </AnimatedGrid>
      </Grid>
    </Box>
  );
};

export default React.memo(MainContainer);
