import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const makeRequest = async (data = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, data);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { makeRequest, errors };
};

export default useRequest;
