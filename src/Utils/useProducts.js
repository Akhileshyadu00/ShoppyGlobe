// Utils/useProducts.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "./productSlice";

export const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.items);
  const status = useSelector((state) => state.product.status);

  const fetchData = () => {
    if (status === "idle") {
      dispatch(fetchProduct());
    }
  };

  useEffect(() => {
    fetchData();
  }, [status, dispatch]);

  const categoryOnlyData = [
    ...new Set(data?.map((item) => item.category?.name || "Unknown")),
  ];

  return { data, fetchProduct: fetchData, status, categoryOnlyData };
};
