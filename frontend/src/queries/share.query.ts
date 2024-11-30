import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
export function useGenerateShareLink() {
  return useMutation({
    mutationKey: ["generate-share-link"],
    mutationFn: async (contentId: string) => {
      const response = await axios.post(`${baseUrl}/share/create-link`, {
        contentId,
      });
      return response.data;
    },
  });
}

export function useGetSharedContent() {
  return useMutation({
    mutationKey: ["get-shared-content"],
    mutationFn: async (token: string) => {
      const response = await axios.get(`${baseUrl}/share/${token}`);
      return response.data;
    },
  });
}
