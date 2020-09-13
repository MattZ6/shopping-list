import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';

import store from './src/store';

import light from './src/themes/light';

import Home from './src/pages/Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <Home />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
