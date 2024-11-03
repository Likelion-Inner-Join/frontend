import { createBrowserRouter } from "react-router-dom";
import PostManage from "../../owner/post_manage/post_manage";
import PostWrite from "../../owner/post_write/post_write";
import { PostProvider } from "../../owner/post_context/post_context";
import FormBuilder from "../../owner/apply_form/form_builder";
export const ROUTES = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  POST_MANAGE: "/post-manage",
  POST_WRITE: "/post-write",
  FORM_BUILDER: "/apply-form",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.SIGNUP,
    element: <></>,
  },
  {
    path: ROUTES.LOGIN,
    element: <></>,
  },
  {
    path: ROUTES.POST_MANAGE, // PostManage 페이지 경로 추가
    element: (
      <PostProvider>
        <PostManage />
      </PostProvider>
    ), // PostManage 컴포넌트를 해당 경로에 연결
  },
  {
    path: ROUTES.POST_WRITE, // PostManage 페이지 경로 추가
    element: (
      <PostProvider>
        <PostWrite />
      </PostProvider>
    ), // PostManage 컴포넌트를 해당 경로에 연결
  },
  {
    path: ROUTES.FORM_BUILDER,
    element: <FormBuilder />,
  },
]);
