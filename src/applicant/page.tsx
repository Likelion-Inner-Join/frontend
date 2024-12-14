import { CSSProperties, styled } from "styled-components";
import { Navbar } from "../common/ui";
import { ReactNode } from "react";

export const ApplicantPage = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <Page>
      <Navbar />
      <Content style={style}>{children}</Content>
    </Page>
  );
};

const Page = styled.div``;

const Content = styled.div``;
