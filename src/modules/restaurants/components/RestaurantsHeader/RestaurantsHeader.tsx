import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../../../../common/components/AppText/AppText';
import theme from '../../../../common/theme';

type RestaurantsHeaderProps = {
  title: string;
  subTitle: string;
};

const RestaurantsHeader: FC<RestaurantsHeaderProps> = ({title, subTitle}) => {
  return (
    <View style={styles.header}>
      <AppText type="h1" text={title} bold style={styles.title} />
      <AppText type="h4" text={`Version ${subTitle}`} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.SPACE.MEDIUM,
    alignItems: 'center',
  },
  title: {
    marginBottom: theme.SPACE.XSMALL,
  },
});

export default RestaurantsHeader;
