import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useAuth } from "./userAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-8 w-full max-w-md">
        <Typography variant="h4" className="mb-4 text-center">
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4"
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
