import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantsHeader title="Nando's Restaurants" subTitle={appVersion} />
      {error && <AppText center text={error} />}
      {loading && <ActivityIndicator testID="loader" size="large" />}
      <List data={data} onRestaurantItemPress={handleRestaurantItemPress} />
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
