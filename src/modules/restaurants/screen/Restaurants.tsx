import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';

import AppModal from '../../../common/components/AppModal/AppModal';
import AppText from '../../../common/components/AppText/AppText';
import {appVersion} from '../../../common/native/AppInfo';
import RestaurantsHeader from '../components/RestaurantsHeader/RestaurantsHeader';
import List from '../components/RestaurantsList/RestaurantsList';
import useRestaurants from '../hooks/useRestaurants';

const Restaurants = () => {
  const [restaurantURL, setRestaurantURL] = useState<string>();
  const {data, error, loading, fetchRestaurants} = useRestaurants();
  const scrollPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestaurantItemPress = useCallback((url: string) => {
    setRestaurantURL(url);
  }, []);

  const closeModal = useCallback(() => {
    setRestaurantURL(undefined);
  }, []);

  const renderLoading = () => (
    <ActivityIndicator testID="loader" size="large" />
  );

  const scale = scrollPosition.interpolate({
    inputRange: [-Dimensions.get('window').height, 0],
    outputRange: [4, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View testID="animated_header" style={{transform: [{scale}]}}>
        <RestaurantsHeader title="Nando's Restaurants" subTitle={appVersion} />
      </Animated.View>
      {error && <AppText center text={error} />}
      {loading && <ActivityIndicator testID="loader" size="large" />}
      {data && (
        <List
          data={data}
          onRestaurantItemPress={handleRestaurantItemPress}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollPosition}}}],
            {useNativeDriver: true},
          )}
        />
      )}
      <AppModal visible={Boolean(restaurantURL)} onRequestClose={closeModal}>
        {restaurantURL && (
          <WebView
            testID="webView"
            source={{uri: restaurantURL}}
            renderLoading={renderLoading}
            startInLoadingState
          />
        )}
      </AppModal>
    </SafeAreaView>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
