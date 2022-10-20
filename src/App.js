import * as React from 'react';

import { MainContainer, NavBar } from './components';
import { ThemeWrapper } from './components/themecontext';

const App = () => {
  return (
    <div className="App">
      <ThemeWrapper>
        <NavBar />
        <MainContainer />
      </ThemeWrapper>
    </div>
  );
};

export default App;
