import { styled } from "styled-components";
import { Navbar } from "../common/ui";
import { PropsWithChildren } from "react";

export const ApplicantPage = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Page>
      <Navbar />
      <Content>{children}</Content>
    </Page>
  );
};

const Page = styled.div``;

const Content = styled.div``;
