// services/userService.js
import { apiFetch } from "./api";

export const getUsers = () => apiFetch("users");
export const getUser = (id) => apiFetch(`users/${id}`);
export const createUser = (user) => apiFetch("users/create", "POST", user);
export const updateUser = (id, user) => apiFetch(`users/update/${id}`, "PUT", user);
export const deleteUser = (id) => apiFetch(`users/delete/${id}`, "DELETE");
