import useAuthStore from "../store/useAuthStore";

export const isAuthenticated = () => {
  // Usar el store para verificar autenticación
  const isAuth = useAuthStore.getState().isAuthenticated;
  
  // Verificación de respaldo con localStorage
  if (!isAuth && typeof window !== "undefined") {
    return localStorage.getItem("token") ? true : false;
  }
  
  return isAuth;
};

export const login = (token, userData) => {
  // Guardar en localStorage como respaldo
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
  
  // Actualizar el store
  useAuthStore.getState().login(userData, token);
};

export const logout = () => {
  // Limpiar localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
  
  // Actualizar el store
  useAuthStore.getState().logout();
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return useAuthStore.getState().user;
};