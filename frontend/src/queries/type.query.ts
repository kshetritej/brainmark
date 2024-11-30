import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export function useGetAllTypes() {
  return useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/type/all`);
      return res.data;
    },
  });
}
