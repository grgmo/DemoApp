import React, {FC, useEffect, useRef} from 'react';
import {
  Animated,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import theme from '../../../../common/theme';
import {Restaurant} from '../../../../common/types';
import ListItem from './RestaurantsListItem/RestaurantsListItem';

type RestaurantsListListProps = {
  data: Restaurant[];
  onRestaurantItemPress: (url: string) => void;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

const keyExtractor = (_: object, index: number) => `${index}`;

const renderSeparator = () => {
  return <View style={styles.separator} />;
};

const RestaurantsList: FC<RestaurantsListListProps> = ({
  data,
  onRestaurantItemPress,
  onScroll,
}) => {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = () => {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };

    fadeInAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem: FC<ListRenderItemInfo<Restaurant>> = ({item, index}) => (
    <ListItem {...item} index={index} onPress={onRestaurantItemPress} />
  );

  return (
    <Animated.FlatList
      accessibilityRole="list"
      style={{opacity: fadeIn}}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {height: theme.SPACE.SMALL},
});

export default RestaurantsList;
