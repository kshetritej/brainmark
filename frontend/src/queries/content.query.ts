import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export function useGetAllContents() {
  console.log("base Url", baseUrl);
  return useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const res = await axios.get(`${baseUrl}/content/all`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return res.data;
    },
  });
}

export function useAddNewContent() {
  return useMutation({
    mutationKey: ["add-content"],
    mutationFn: async (data: any) => {
      const res = await axios.post(`${baseUrl}/content`, {
        data,
      });
      return res.data;
    },
  });
}

export function useDeleteContent() {
  return useMutation({
    mutationKey: ["delete-content"],
    mutationFn: async (id: string) => {
      const res = await axios.delete(`${baseUrl}/content/${id}`);
      return res.data;
    },
  });
}

export function useGetContentByType() {
  return useMutation({
    mutationKey: ["content-by-type"],
    mutationFn: async (id: string) => {
      const res = await axios.get(`${baseUrl}/content/type/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return res.data;
    },
  });
}
