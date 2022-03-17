import {useCallback, useMemo} from 'react';
import Config from 'react-native-config';

import useApi from '../../../common/hooks/useApi';
import adaptRestaurants from '../adapters/adaptRestaurants';

const useRestaurants = () => {
  const {state, fetchData} = useApi(Config.RESTAURANTS_URL);

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
