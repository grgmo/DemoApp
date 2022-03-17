import React, {FC, useCallback} from 'react';
import {Pressable, PressableStateCallbackType, StyleSheet} from 'react-native';
import theme from '../../../../../common/theme';
import AppText from '../../../../../common/components/AppText/AppText';

type RestaurantsListItemProps = {
  title: string;
  street: string;
  locality: string;
  postCode: string;
  url: string;
  onPress: (url: string) => void;
};

const RestaurantsListItem: FC<RestaurantsListItemProps> = ({
  title,
  street,
  locality,
  postCode,
  url,
  onPress,
}) => {
  const itemStyle = ({pressed}: PressableStateCallbackType) => [
    {
      backgroundColor: pressed ? theme.COLOR.whitesmoke : theme.COLOR.white,
    },
    styles.listItem,
  ];

  const handlePress = useCallback(() => {
    onPress(url);
  }, [onPress, url]);

  return (
    <Pressable
      accessibilityRole="button"
      style={itemStyle}
      onPress={handlePress}>
      <AppText type="h2" text={title} bold style={styles.title} />
      <AppText type="h3" text={street} />
      <AppText type="h3" text={locality} />
      <AppText type="h3" text={postCode} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: theme.SPACE.SMALL,
    paddingHorizontal: theme.SPACE.SMALL,
    paddingVertical: theme.SPACE.MEDIUM,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: theme.COLOR.lightGrey,
  },
  title: {
    marginBottom: theme.SPACE.SMALL,
  },
});

export default RestaurantsListItem;
