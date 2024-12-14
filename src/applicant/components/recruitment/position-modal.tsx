import { useState } from "react";
import { styled } from "styled-components";
import { FaCheck } from "react-icons/fa";
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

  return (
    <Overlay>
      <ModalContainer>
        <Title>지원할 포지션 선택</Title>
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
        <ButtonContainer>
          <Button
            label="지원 서류 작성하러 가기"
            onClick={() => {
              if (selectedPosition) {
                onSelect(selectedPosition);
              }
            }}
            disabled={!selectedPosition}
          />
          <Button label="닫기" onClick={closeModal} variant="secondary" />
        </ButtonContainer>
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 30px;
  width: 500px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #333;
`;

const PositionList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const PositionItem = styled.li`
  width: 30%;
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input`
  display: none;
`;

const CustomCheckbox = styled.span<{ checked: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 2px solid ${(props) => props.theme.color.primary};
  border-radius: 4px;
  margin-right: 8px;
  color: #fff;
  font-size: 14px;
  background-color: ${(props) =>
    props.checked ? props.theme.color.primary : "transparent"};

  svg {
    display: ${(props) => (props.checked ? "block" : "none")};
    color: #fff;
  }
`;

const Label = styled.label`
  font-size: 1em;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;
