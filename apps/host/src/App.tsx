import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import ErrorBoundary from "./components/ErrorBoundary";

const HomeScreen = React.lazy(() => import('home/HomeScreen'));

function App(): React.JSX.Element {

  return (
      <SafeAreaView>
        <ErrorBoundary name="HomeScreen">
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <HomeScreen/>
          </React.Suspense>
        </ErrorBoundary>
      </SafeAreaView>
  );
}
export default App;
