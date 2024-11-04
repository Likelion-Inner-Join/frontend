import { createBrowserRouter } from "react-router-dom";
import DocEvaluate from "../../manager/pages/DocEvaluate";
import { GlobalStyle } from "../styles/GlobalStyles";
import ResultShare from "../../manager/pages/ResultShare";
import { LoginPage, SignupPage, VerificationPage } from "../../auth/pages";
import {
  ApplicationFormPage,
  MyPage,
  RecruitmentListPage,
  RecruitmentPage,
} from "../../applicant/pages";
import PostManage from "../../owner/post_manage/post_manage";
import PostWrite from "../../owner/post_write/post_write";
import FormBuilder from "../../owner/apply_form/form_builder";
import { PostProvider } from "../../owner/post_context/post_context";

export const ROUTES = {
  LANDING: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  DOCEVALUATE: "/doc-eval",
  VERIFICATION: "/verification",
  MY: "/my",
  RECRUITMENT: "/recruitment/:clubId",
  APPLICATION: "/application/:clubId",
  RESULTSHARE: "/result",
  POST_MANAGE: "/post-manage",
  POST_WRITE: "/post-write",
  FORM_BUILDER: "/apply-form",
};

export const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: <RecruitmentListPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignupPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  
  {
    path: ROUTES.VERIFICATION,
    element: <VerificationPage />,
  },
  {
    path: ROUTES.MY,
    element: <MyPage />,
  },
  {
    path: ROUTES.RECRUITMENT,
    element: <RecruitmentPage />,
  },
  {
    path: ROUTES.APPLICATION,
    element: <ApplicationFormPage />,
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
    path: ROUTES.FORM_BUILDER,
    element: <FormBuilder />,
  },
  {
    path: ROUTES.DOCEVALUATE,
    element: (
      <div>
        <GlobalStyle />
        <DocEvaluate />
      </div>
    ),
  },
  {
    path: ROUTES.RESULTSHARE,
    element: (
      <div>
        <GlobalStyle />
        <ResultShare />
      </div>
    ),
  },
]);
