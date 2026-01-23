/**
 * authService - API wrapper for authentication endpoints
 *
 * All calls go through apiClient which adds JWT token header automatically.
 */

import apiClient from "./apiClient";

const authService = {
  // Login - returns { access, refresh } tokens
  login: (email, password) =>
    apiClient.post("/auth/login/", { email, password }),

  // Signup - creates new user account
  signup: (userData) => apiClient.post("/auth/signup/", userData),

  // Get current user info (requires auth)
  getMe: () => apiClient.get("/auth/me/"),

  // Update user profile
  updateProfile: (profileId, profileData) =>
    apiClient.put(`/auth/profile/${profileId}/`, profileData),

  // Refresh access token
  refreshToken: (refreshToken) =>
    apiClient.post("/auth/token/refresh/", { refresh: refreshToken }),
};

export default authService;
