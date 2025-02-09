import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import {SafeAreaView} from 'react-native';
import {commonStyles} from './styles/common';

export const RootComponent = () => {
  return (
    <SafeAreaView style={commonStyles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};
