import  { useState, useEffect } from "react";
import axios from 'axios'

const useFetch = (url: string, options?:any) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateTime, setUpdateTime] = useState(null)

  useEffect(() => {
    const doFetch = async () => {
        try {
          setLoading(true);
          const res = await axios.get(url, options);
          setResponse(res.data);
          setUpdateTime(res.headers.date)
          setError(null)
        }catch(e) {
            setError(e)
        }finally {
            setLoading(false);
        }   
    }
    doFetch();
    const interval=setInterval(()=>{
      doFetch();
     },300000)   
     return()=>clearInterval(interval)
  }, [url, options, error]);
  return {response,updateTime,error,loading};
};
export default useFetch;