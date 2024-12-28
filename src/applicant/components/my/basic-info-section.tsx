import styled from "styled-components";

export const BasicInfoSection = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>기본 정보</SectionTitle>
      </SectionHeader>
      <InfoTable>
        <tbody>
          <Tr>
            <Th>이름</Th>

            <Td>{name}</Td>
          </Tr>
          <Tr>
            <Th>이메일</Th>

            <Td>{email}</Td>
          </Tr>
        </tbody>
      </InfoTable>
    </Section>
  );
};

const Section = styled.div`
  max-width: 912px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding-left: 16px;
`;

const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  & > th,
  & > td {
    padding-bottom: 54px;
  }
`;

const Th = styled.th`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #424242;
  padding: 8px 16px;
  width: 120px;
  vertical-align: top;
`;

const Td = styled.td`
  padding: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
`;
