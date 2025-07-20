import React from 'react';
import {ScrollView, StatusBar, Text, useColorScheme, View,} from 'react-native';

import {Colors, Header, LearnMoreLinks,} from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header/>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
            <Text>여기는 Home 앱 입니다</Text>
            <Text>MINI 앱 테스트</Text>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
}

export default App;
