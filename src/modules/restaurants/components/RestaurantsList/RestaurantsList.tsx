import React, {FC} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';

import theme from '../../../../common/theme';
import {Restaurant} from '../../../../common/types';
import ListItem from './RestaurantsListItem/RestaurantsListItem';

type RestaurantsListListProps = {
  data: Restaurant[];
  onRestaurantItemPress: (url: string) => void;
};

const keyExtractor = (_: object, index: number) => `${index}`;

const renderSeparator = () => {
  return <View style={styles.separator} />;
};

const RestaurantsList: FC<RestaurantsListListProps> = ({
  data,
  onRestaurantItemPress,
}) => {
  const renderItem: FC<ListRenderItemInfo<Restaurant>> = ({item, index}) => (
    <ListItem {...item} index={index} onPress={onRestaurantItemPress} />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
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
