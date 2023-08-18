import { useEffect, useReducer } from "react";
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

type State<T> = {
  data: T | undefined;
  error: AxiosError | undefined;
  isLoading: boolean;
};

type Action<T> =
  | { type: "REQUEST" }
  | { type: "FETCH"; payload: T }
  | { type: "ERROR"; payload: AxiosError };

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, isLoading: true };
    case "FETCH":
      return { ...state, isLoading: false, data: action.payload };
    case "ERROR":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

type inputPara = {
  url: string;
  method: string; // Use string type here
  requestBody?: any;
  headers?: AxiosRequestConfig["headers"];
};

function UseFetch<T>(input: inputPara): State<T> {
  const [state, dispatch] = useReducer(reducer<T>, {
    data: undefined,
    isLoading: true,
    error: undefined,
  });

  const fetchData = async () => {
    // REQUEST
    dispatch({ type: "REQUEST" });

    try {
      // FETCH
      const response: AxiosResponse<T> = await axios({
        method: input.method,
        url: input.url,
        data: input.requestBody,
        headers: input.headers,
      });
      dispatch({ type: "FETCH", payload: response.data });
    } catch (error) {
      // ERROR
      dispatch({ type: "ERROR", payload: error as AxiosError });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return state;
}

export default UseFetch;
