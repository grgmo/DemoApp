import React, {useCallback, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import AppModal from '../../../common/components/AppModal/AppModal';
import RestaurantsHeader from '../components/RestaurantsHeader/RestaurantsHeader';
import List from '../components/RestaurantsList/RestaurantsList';

const DATA = [
  {
    title: 'Aberdeen - Belmont Street',
    url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-belmont-street',
    street: 'Unit 10, The Academy, Belmont St',
    locality: 'Aberdeen, Aberdeen City',
    postCode: 'AB10 1LB',
  },
  {
    title: 'Aberdeen - Union Square',
    url: 'https://www.nandos.co.uk/eat/restaurants/aberdeen-union-square',
    street: 'Unit 10, The Academy, Belmont St',
    locality: 'Aberdeen, Aberdeen City',
    postCode: 'AB10 1LB',
  },
];

const Restaurants = () => {
  const [restaurantURL, setRestaurantURL] = useState<string>();

  const handleRestaurantItemPress = useCallback((url: string) => {
    setRestaurantURL(url);
  }, []);

  const closeModal = useCallback(() => {
    setRestaurantURL(undefined);
  }, []);

  const renderLoading = () => <ActivityIndicator size="large" />;

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantsHeader title="Nando's Restaurants" subTitle="1.0.0" />
      <List data={DATA} onRestaurantItemPress={handleRestaurantItemPress} />
      <AppModal visible={Boolean(restaurantURL)} onRequestClose={closeModal}>
        {restaurantURL && (
          <WebView
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
