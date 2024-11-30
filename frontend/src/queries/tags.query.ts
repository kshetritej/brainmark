import {  useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export function useGetAllTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/tag/all`);
      return res.data;
    },
  });
}
