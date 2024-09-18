import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./userAuth";

function Home() {
  const navigate = useNavigate();
  const { logout, username } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Typography variant="h4" className="mb-4">
        Welcome, {username}!
      </Typography>
      <Typography variant="body1" className="mb-4">
        This is a dummy home page. You'll be logged out after 30 minutes of
        inactivity.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default Home;
