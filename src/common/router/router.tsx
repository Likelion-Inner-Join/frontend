import { createBrowserRouter } from "react-router-dom";
import DocEvaluate from "../../manager/pages/DocEvaluate";
import { GlobalStyle } from "../styles/GlobalStyles";
import ResultShare from "../../manager/pages/ResultShare";
import FinalResultShare from "../../manager/pages/FinalResultShare";
import { LoginPage, SignupPage, VerificationPage } from "../../auth/pages";
import {
  ApplicationFormPage,
  MyPage,
  RecruitmentListPage,
  RecruitmentPage,
} from "../../applicant/pages";
import PostManage from "../../owner/post_manage/post_manage";
import PostWrite from "../../owner/post_write/post_write";
import PostEdit from "../../owner/post_edit/post_edit";
import { PostProvider } from "../../owner/post_context/post_context";
import ApplyForm from "../../owner/apply_form/apply_form";
import ApplyManage from "../../owner/apply_manage/apply_manage";
import WriteEmail from "../../manager/pages/WriteEmail";
import SendEmail from "../../manager/pages/SendEmail";
import MeetEvaluate from "../../manager/pages/MeetEvaluate";
import MeetArrange from "../../manager/pages/MeetArrange";
import ApplyEdit from "../../owner/apply_edit/apply_edit";

export const ROUTES = {
  LANDING: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  DOC_EVALUATE: "/doc-eval",
  APPLY_FORM_VIEW: "/doc-eval/applyID",
  VERIFICATION: "/verification",
  MY: "/my",
  RECRUITMENT: "/recruitment/:clubId",
  APPLICATION: "/application/:clubId",
  RESULTSHARE: "/result",
  FINAL_RESULTSHARE: "/final-result",
  POST_MANAGE: "/post-manage",
  POST_WRITE: "/post-write",
  POST_EDIT: "/post-edit/:postId",
  APPLY_FORM: "/apply-form",
  APPLY_MANAGE: "/apply-manage",
  APPLY_EDIT: "/apply-edit/:id",
  WRTIE_EMAIL: "/email-write",
  SEND_EMAIL: "/email-send",
  MEET_EVALUATE: "meet-eval",
  MEET_ARRANGE: "meet-table",
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
    path: ROUTES.POST_EDIT,
    element: (
      <PostProvider>
        <PostEdit />
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
  {
    path: ROUTES.APPLY_EDIT,
    element: <ApplyEdit />,
  },
  {
    path: ROUTES.DOC_EVALUATE,
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
  {
    path: ROUTES.FINAL_RESULTSHARE,
    element: (
      <div>
        <GlobalStyle />
        <FinalResultShare />
      </div>
    ),
  },
  {
    path: ROUTES.WRTIE_EMAIL,
    element: (
      <div>
        <GlobalStyle />
        <WriteEmail />
      </div>
    ),
  },
  {
    path: ROUTES.SEND_EMAIL,
    element: (
      <div>
        <GlobalStyle />
        <SendEmail />
      </div>
    ),
  },
  {
    path: ROUTES.MEET_EVALUATE,
    element: (
      <div>
        <GlobalStyle />
        <MeetEvaluate />
      </div>
    ),
  },
  {
    path: ROUTES.MEET_ARRANGE,
    element: (
      <div>
        <GlobalStyle />
        <MeetArrange />
      </div>
    ),
  },
]);
