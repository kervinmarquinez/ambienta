export const isAuthenticated = () => {
    // Verificar si el token JWT existe en el localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };
  
  export const login = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token); // Guardar el token en el localStorage
    }
  };
  
  export const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token"); // Eliminar el token del localStorage
    }
  };