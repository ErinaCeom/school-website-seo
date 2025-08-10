"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography } from "@mui/material";
import { supabaseBrowser } from "@/lib/supabaseBrowserClient";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be 8 characters.");
      return;
    }

    setError(null);
    setIsLoading(true);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email: "admin@spsc.edu", // 🔒 Hardcoded admin email
      password,
    });

    if (error) {
      setError("Invalid password.");
      setIsLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "auto",
        p: 4,
        border: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h5" fontWeight="bold">
          Login
        </Typography>
        <Typography variant="subtitle2">
          Enter password to access admin panel
        </Typography>
      </Box>

      <TextField
        label="Password"
        type="password"
        value={password}
        error={!!error}
        helperText={error}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        slotProps={{ htmlInput: { maxLength: 8 } }}
        sx={{
          "& fieldset": {
            borderColor: "#fff",
          },
          "&:hover fieldset": {
            borderColor: "#fff",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#fff",
          },
          "& .MuiInputLabel-root": {
            color: "#fff",
          },
          "& .MuiFormHelperText-root": {
            color: "red",
          },
          color: "#fff",
        }}
      />

      <Button
        type="submit"
        variant="contained"
        loading={isLoading}
        fullWidth
        sx={{
          bgcolor: "#4662f0",
          "&.MuiButton-loading": {
            bgcolor: "#33459c",
            "&.MuiButton-loadingIndicator": {
              color: "white",
              borderColor: "white",
            },
          },
        }}
      >
        Login
      </Button>

      <Typography variant="caption" textAlign="center" color="gray">
        Forgot password? Contact administrator.
      </Typography>
    </Box>
  );
}
