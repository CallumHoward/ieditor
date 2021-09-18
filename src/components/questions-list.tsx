import React, { FunctionComponent, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Mousewheel, Navigation } from "swiper";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { QuestionT } from "../types/question";
import { Question } from "./question";
import { DraggableQuestion } from "./draggable-question";
import styled from "styled-components";

const SwiperContainer = styled.div`
  height: 800px;
  backgroun: grey;
`;

const initialQuestions = [
  {
    id: "0",
    content: "foo",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "bar",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "baz",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "fizz",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "buzz",
    type: "input",
    answer: { content: "unanswered" },
  },
] as QuestionT[];

export const QuestionsList: FunctionComponent = () => {
  const [questions, setQuestions] = useState<QuestionT[]>(initialQuestions);

  SwiperCore.use([Keyboard,Mousewheel,Navigation]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newQuestions = [...questions];
    const [removed] = newQuestions.splice(result.source.index, 1);
    newQuestions.splice(result.destination.index, 0, removed);
    setQuestions(newQuestions);
  };

  const renderDnd = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {questions.map(({ id, content }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => (
                  <DraggableQuestion
                    provided={provided}
                    snapshot={snapshot}
                    content={content}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );

  const renderSwiper = () => (
    <SwiperContainer>
      <Swiper
        direction={"vertical"}
        centeredSlides={true}
        freeMode={true}
        keyboard={{ enabled: true }}
        mousewheel={true}
        slidesPerView={2}
        spaceBetween={50}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {questions.map(({ content }, index) => (
          <SwiperSlide key={index}>
            <Question content={content} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );

  return (
    <>
      {renderSwiper()}
      <button>toggle</button>
    </>
  );
};
