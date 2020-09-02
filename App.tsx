import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import light from './src/themes/light';

import Home from './src/pages/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={light}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
