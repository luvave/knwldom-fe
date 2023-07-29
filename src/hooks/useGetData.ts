import { useState, useEffect } from 'react';

const promiseWrapper = <T>(promise: Promise<T>) => {
  let status = 'pending';
  let result;

  const s = promise.then(
    (value) => {
      status = 'success';
      result = value;
    },
    (error) => {
      status = 'error';
      result = error;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw s;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};

function useGetData<T>(promise: Promise<T>) {
  const [resource, setResource] = useState<T>();

  useEffect(() => {
    const getData = async () => {
      setResource(promiseWrapper(promise));
    };

    void getData();
  }, [promise]);

  return resource;
}

export default useGetData;
