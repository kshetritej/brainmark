import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useReducer } from "react";
const baseUrl = import.meta.env.VITE_API_URL;

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: any) => {
      const res = await axios.post(`${baseUrl}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      return res.data;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: any) => {
      const res = await axios.post(`${baseUrl}/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return res.data;
    },
  });
}
