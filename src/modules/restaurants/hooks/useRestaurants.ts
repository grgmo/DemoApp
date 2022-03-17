import {useCallback, useMemo} from 'react';

import useApi from '../../../common/hooks/useApi';
import adaptRestaurants from '../adapters/adaptRestaurants';

const useRestaurants = () => {
  const {state, fetchData} = useApi(
    'https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json',
  );

  const adaptedData = useMemo(() => adaptRestaurants(state.data), [state.data]);

  const fetchRestaurants = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    data: adaptedData,
    fetchRestaurants,
  };
};

export default useRestaurants;
