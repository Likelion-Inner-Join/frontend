import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableList = ({ items, setItems, updateItem, deleteItem }) => {
  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="formContent">
        {(provided) => (
          <List ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <ItemWrapper
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {renderItemContent(item, updateItem, deleteItem)}
                  </ItemWrapper>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const renderItemContent = (item, updateItem, deleteItem) => {
  switch (item.type) {
    case "multiple_choice":
      return (
        <ItemContainer>
          <ItemTitle>질문: {item.question || "새 질문"}</ItemTitle>
          <DeleteButton onClick={() => deleteItem(item.id)}>삭제</DeleteButton>
        </ItemContainer>
      );
    case "border":
      return (
        <ItemContainer>
          <Border />
          <DeleteButton onClick={() => deleteItem(item.id)}>삭제</DeleteButton>
        </ItemContainer>
      );
    case "description":
      return (
        <ItemContainer>
          <ItemTitle>설명: {item.description || "설명 입력"}</ItemTitle>
          <DeleteButton onClick={() => deleteItem(item.id)}>삭제</DeleteButton>
        </ItemContainer>
      );
    default:
      return null;
  }
};

export default DraggableList;

// Styled components
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemWrapper = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemTitle = styled.div`
  font-size: 16px;
`;

const DeleteButton = styled.button`
  background-color: white;
  color: red;
  border: none;
  cursor: pointer;
`;

const Border = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
`;
