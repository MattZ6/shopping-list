import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import { ThemeProvider } from 'styled-components/native';

import database from './src/database';

import light from './src/themes/light';

import Routes from './src/routes';

const App: React.FC = () => {
  return (
    <DatabaseProvider database={database}>
      <ThemeProvider theme={light}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <Routes />
      </ThemeProvider>
    </DatabaseProvider>
  );
};

export default App;
