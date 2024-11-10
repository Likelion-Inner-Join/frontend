// src/common/PostContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Context 생성
export const PostContext = createContext();

// Helper function to manage local storage
const getPostsFromStorage = () => {
  const storedPosts = localStorage.getItem("posts");
  return storedPosts ? JSON.parse(storedPosts) : [];
};

// Provider 생성
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(getPostsFromStorage);

  useEffect(() => {
    // Save posts to local storage whenever they change
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
};
