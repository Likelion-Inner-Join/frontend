import { createBrowserRouter } from "react-router-dom";
import PostManage from "../../owner/post_manage/post_manage";
import PostWrite from "../../owner/post_write/post_write";
import { PostProvider } from "../../owner/post_context/post_context";
import ApplyForm from "../../owner/apply_form/apply_form";
import ApplyManage from "../../owner/apply_manage/apply_manage";
export const ROUTES = {
  SIGNUP: "/signup",
  LOGIN: "/login",
  POST_MANAGE: "/post-manage",
  POST_WRITE: "/post-write",
  FORM_BUILDER: "/apply-form",
  APPLY_FORM: "/apply-form",
  APPLY_MANAGE: "/apply-manage",
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
    path: ROUTES.POST_MANAGE,
    element: (
      <PostProvider>
        <PostManage />
      </PostProvider>
    ),
  },
  {
    path: ROUTES.POST_WRITE,
    element: (
      <PostProvider>
        <PostWrite />
      </PostProvider>
    ),
  },
  {
    path: ROUTES.APPLY_FORM,
    element: <ApplyForm />,
  },
  {
    path: ROUTES.APPLY_MANAGE,
    element: <ApplyManage />,
  },
]);
