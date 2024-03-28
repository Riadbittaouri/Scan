import React, { useState, useEffect, createContext } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [domain, setDomain] = useState("http://localhost:8000");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appSettings, setAppSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAppSettings = async () => {
      try {
        const response = await fetch(`${domain}/api/v1.0/app/settings`);
        if (!response.ok) {
          throw new Error("Failed to fetch app settings");
        }
        const json = await response.json();
        setAppSettings(json);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    initAppSettings();
  }, []);

  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn,
    appSettings,
    loading,
    error,
  };

  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export { Context, Provider };
