import Axios from "axios";
import React, { useCallback, useEffect } from "react";

const axios = Axios.create({
  baseURL: window._env_.API_URL,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAPI = (dataUrl) => {
  const [state, setState] = React.useState({
    loading: true,
    processing: false,
    error: null,
    data: [] || {},
  });

  useEffect(() => {
    if (!dataUrl) return;

    get(dataUrl)
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get = useCallback(async (url) => {
    return new Promise((res, rej) => {
      axios
        .get(url)
        .then((resp) => {
          res(resp.data);
        })
        .catch((error) => {
          setState((prev) => ({ ...prev, error }));
          rej(error);
        })
        .finally(() => setState((prev) => ({ ...prev, loading: false })));
    });
  }, []);

  const post = async (url, body) => {
    setState({ ...state, processing: true });
    return new Promise((res, rej) => {
      axios
        .post(url, body)
        .then((resp) => {
          res(resp.data);
        })
        .catch((error) => {
          setState((prev) => ({ ...prev, error }));
          rej(error);
        })
        .finally(() => setState((prev) => ({ ...prev, processing: false })));
    });
  };

  const put = async (url, body) => {
    setState({ ...state, processing: true });
    return new Promise((res, rej) => {
      axios
        .put(url, body)
        .then((resp) => {
          res(resp.data);
        })
        .catch((error) => {
          setState((prev) => ({ ...prev, error }));
          rej(error);
        })
        .finally(() => setState((prev) => ({ ...prev, processing: false })));
    });
  };

  const del = async (url) => {
    setState({ ...state, processing: true });
    return new Promise((res, rej) => {
      axios
        .delete(url)
        .then((resp) => {
          res(resp.data);
        })
        .catch((error) => {
          setState((prev) => ({ ...prev, error }));
          rej(error);
        })
        .finally(() => setState((prev) => ({ ...prev, processing: false })));
    });
  };

  const refetch = () => {
    setState({ ...state, loading: true });
    get(dataUrl)
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };

  return { ...state, get, post, put, del, refetch };
};
