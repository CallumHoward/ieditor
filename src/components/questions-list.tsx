import React, { FunctionComponent, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard, Mousewheel, Navigation } from "swiper";
import { animate } from "popmotion";

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
  position: relative;
  // height: 100%;
  backgroun: grey;
`;

const ListContainer = styled.div``;

const initialQuestions = [
  {
    id: "0",
    content: `Have you selected "Abercrombie Caves" for sites`,
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "1",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "2",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "3",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
  {
    id: "4",
    content: "Should be profiled and have current day and time.",
    type: "input",
    answer: { content: "unanswered" },
  },
] as QuestionT[];

export const QuestionsList: FunctionComponent = () => {
  const [questions, setQuestions] = useState<QuestionT[]>(initialQuestions);
  const [spaceBetween, setSpaceBetween] = useState(0);

  SwiperCore.use([Keyboard, Mousewheel, Navigation]);

  useEffect(() => {
    animate({
      from: 0,
      to: 50,
      duration: 1000,
      onUpdate: (latest) => setSpaceBetween(latest),
    });
  }, []);

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
        slidesPerView={"auto"}
        spaceBetween={spaceBetween}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {questions.map(({ content }, index) => (
          <SwiperSlide key={index} style={{ height: "50%" }}>
            <Question content={content} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );

  return (
    <ListContainer>
      {renderDnd()}
      <button>toggle</button>
    </ListContainer>
  );
};
