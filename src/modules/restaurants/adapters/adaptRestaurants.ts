import {RestaurantResponse} from '../types';

const adaptRestaurants = (stateData: any) => {
  if (!stateData?.data?.restaurant?.items) {
    return null;
  }

  return stateData.data.restaurant.items.map(
    ({name, url, geo}: RestaurantResponse) => ({
      title: name,
      url,
      street: geo.address.streetAddress,
      locality: geo.address.addressLocality,
      postCode: geo.address.postalCode,
    }),
  );
};

export default adaptRestaurants;
