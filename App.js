/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import SplashScreen from './src/screen/SplashScreen';
import { BackHandler } from 'react-native'

class App extends Component {
  WEBVIEW_REF = React.createRef();
  state = {
    canGoBack: false,
    loading: true,
    currentCount: 3
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }

  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if (this.state.currentCount < 1) {
      clearInterval(this.intervalId);
      this.setState({
        loading: false
      })
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    clearInterval(this.intervalId);
  }

  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <SplashScreen />
        ) : (
          <WebView
            source={{ uri: "https://joko19.github.io/online-programming-platform/" }}
            ref={this.WEBVIEW_REF}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        )}
      </>
    );
  }
}
export default App;
