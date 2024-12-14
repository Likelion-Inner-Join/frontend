import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Button } from "../../../common/ui";

type TModalProps = {
  closeModal: () => void;
  positions: string[];
  onSelect: (position: string) => void;
};
export const PositionModal = ({
  closeModal,
  positions,
  onSelect,
}: TModalProps) => {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>지원할 포지션 선택</Title>
          <CloseButton onClick={closeModal}>
            <FaTimes />
          </CloseButton>
        </Header>
        <PositionList>
          {positions.map((position) => (
            <PositionItem key={position}>
              <Label>
                <RadioButton
                  type="radio"
                  name="position"
                  value={position}
                  checked={selectedPosition === position}
                  onChange={() => setSelectedPosition(position)}
                />
                <CustomCheckbox checked={selectedPosition === position}>
                  {selectedPosition === position && <FaCheck />}
                </CustomCheckbox>
                {position}
              </Label>
            </PositionItem>
          ))}
        </PositionList>
        <ButtonWrapper>
          <Button
            label="지원 서류 작성하러 가기"
            onClick={() => {
              if (selectedPosition) {
                onSelect(selectedPosition);
              }
            }}
            disabled={!selectedPosition}
            size="large"
          />
        </ButtonWrapper>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 40px;
  width: 480px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.6em;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  color: #666;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.color.primary};
  }
`;

const PositionList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 20px;
  margin-top: 25px;
`;

const PositionItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const RadioButton = styled.input`
  display: none;
`;

const CustomCheckbox = styled.span<{ checked: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 2px solid ${(props) => props.theme.color.primary};
  border-radius: 4px;
  margin-right: 12px;
  background-color: ${(props) =>
    props.checked ? props.theme.color.primary : "transparent"};
  color: #fff;
  font-size: 16px;

  svg {
    display: ${(props) => (props.checked ? "block" : "none")};
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.2em;
  color: #333;
  cursor: pointer;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
