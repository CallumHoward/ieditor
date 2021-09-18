import React from "react";
import { Question } from "../components/question";
import { ScrollableList } from "../components/scrollable-list";

const ScrollListTest = () => {
  return (
    <ScrollableList>
      <Question content={"blah 1"} />
      <Question content={"blah 2"} />
      <Question content={"blah 3"} />
      <Question content={"blah 4"} />
      <Question content={"blah 5"} />
      <Question content={"blah 6"} />
      <Question content={"blah 7"} />
      <Question content={"blah 8"} />
      <Question content={"blah 9"} />
      <Question content={"blah 10"} />
      <Question content={"blah 11"} />
      <Question content={"blah 12"} />
    </ScrollableList>
  );
};

export { ScrollListTest };
