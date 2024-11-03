// src/common/PostContext.jsx
import React, { createContext, useState } from "react";

// Context 생성
export const PostContext = createContext();

// Provider 생성
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "🦁멋쟁이사자처럼 서강대학교에서 13기 아기사자를 모집합니다!🦁",
      date: "2024/10/20 작성",
      deadline: "2024년 10월 27일 (토) 마감",
      remainingDays: "D-7",
      description:
        "안녕하세요, 멋쟁이사자처럼 서강대학교입니다! 13기 아기사자 모집이 시작되었습니다. 창업, 웹 개발에 관심 있는 분은 누구나 지원 가능합니다.",
    },
  ]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
