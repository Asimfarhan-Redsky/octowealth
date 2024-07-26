import './sentry-config';
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsConfig from "./config/aws-config";
import { AppNavigator } from "./navigation/AppNavigator";
import HideBottomTabProvider from "./context/HideBottomTabProvider";
import store from "./redux/store";
import { Provider } from "react-redux";
import InvestmentProvider from "./context/InvestmentProvider";
import { Platform, SafeAreaView, StatusBar } from 'react-native'
import { backgroundColor } from "./constants/colors";


Amplify.configure(awsConfig);

function App() {
  useEffect(() => {
    StatusBar?.setBarStyle('dark-content')
    // StatusBar?.setBackgroundColor(backgroundColor)
  }, []);
  
  return (
    <Provider store={store}>
      <InvestmentProvider>
        <HideBottomTabProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor, paddingTop: Platform?.OS == 'android' ? StatusBar.currentHeight : 0 }}>
            <AppNavigator />
          </SafeAreaView>
        </HideBottomTabProvider>
      </InvestmentProvider>
    </Provider>
  );
}

export default App;
