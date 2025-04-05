import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";

export const useAdmin = () => {
  return useContext(AdminContext);
};