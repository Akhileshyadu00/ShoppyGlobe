import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./productSlice";

export const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  const fetchData = () => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, dispatch]);

  const categoryOnlyData = useMemo(() => {
    return [...new Set(data?.map((item) => item.category || "Unknown"))];
  }, [data]);

  return { data, fetchProduct: fetchData, status, categoryOnlyData };
};
