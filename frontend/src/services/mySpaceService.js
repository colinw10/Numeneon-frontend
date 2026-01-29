// 🔵 PABLO - MySpace Service
// mySpaceService.js - API calls for MySpace profile and music data

import apiClient from "./apiClient";

/**
 * Get a user's MySpace profile data (including playlist)
 * @param {string} username - The username to fetch
 * @returns {Promise} MySpace profile data
 */
export const getMySpaceProfile = async (username) => {
  try {
    const response = await apiClient.get(`/myspace/${username}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching MySpace profile:", error);
    throw error;
  }
};

/**
 * Update own MySpace profile settings
 * @param {object} data - Profile data to update
 * @returns {Promise} Updated profile data
 */
export const updateMySpaceProfile = async (data) => {
  try {
    const response = await apiClient.put("/myspace/", data);
    return response.data;
  } catch (error) {
    console.error("Error updating MySpace profile:", error);
    throw error;
  }
};

/**
 * Add a song to the playlist
 * @param {object} song - Song data { title, artist, duration, preview_url, spotify_id?, album_art? }
 * @returns {Promise} Added song data
 */
export const addSongToPlaylist = async (song) => {
  try {
    const response = await apiClient.post("/myspace/playlist/", song);
    return response.data;
  } catch (error) {
    console.error("Error adding song:", error);
    throw error;
  }
};

/**
 * Remove a song from the playlist
 * @param {number} songId - ID of the song to remove
 * @returns {Promise}
 */
export const removeSongFromPlaylist = async (songId) => {
  try {
    const response = await apiClient.delete(`/myspace/playlist/${songId}/`);
    return response.data;
  } catch (error) {
    console.error("Error removing song:", error);
    throw error;
  }
};

/**
 * Reorder playlist
 * @param {array} songIds - Array of song IDs in new order
 * @returns {Promise}
 */
export const reorderPlaylist = async (songIds) => {
  try {
    const response = await apiClient.put("/myspace/playlist/reorder/", {
      song_ids: songIds,
    });
    return response.data;
  } catch (error) {
    console.error("Error reordering playlist:", error);
    throw error;
  }
};

/**
 * Search for songs via backend proxy (Spotify/Deezer)
 * @param {string} query - Search query
 * @returns {Promise} Array of song results
 */
export const searchSongs = async (query) => {
  try {
    const response = await apiClient.get("/music/search/", {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching songs:", error);
    throw error;
  }
};

export default {
  getMySpaceProfile,
  updateMySpaceProfile,
  addSongToPlaylist,
  removeSongFromPlaylist,
  reorderPlaylist,
  searchSongs,
};
