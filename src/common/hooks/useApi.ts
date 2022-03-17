import {useCallback, useReducer} from 'react';

type FetchState = {
  loading: boolean;
  data: any;
  error: any;
};

type LOADING = {
  type: 'loading';
};

type ERROR = {
  type: 'error';
  payload: any;
};

type LOADED = {
  type: 'loaded';
  payload: any;
};

type DispatchType = LOADING | ERROR | LOADED;

const initialState: FetchState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state: FetchState, action: DispatchType) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: null,
      };
    case 'loaded':
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
  }
};

const useApi = (url: string) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    try {
      dispatch({type: 'loading'});
      const result = await fetch(url);
      if (result.ok) {
        const data = await result.json();
        dispatch({type: 'loaded', payload: data});
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error: any) {
      dispatch({type: 'error', payload: error.message});
    }
  }, [url]);

  return {
    state,
    fetchData,
  };
};

export default useApi;
