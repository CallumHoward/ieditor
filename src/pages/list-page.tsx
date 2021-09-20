import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useYProvider } from "../contexts/yjs-context";

const initialState = [
  { value: "hello", active: true },
  { value: "world", active: false },
  { value: "foobar", active: true },
];

export const ListPage: FunctionComponent = () => {
  const [state, setState] = useState(initialState);

  const {provider, ymap, undoManager} = useYProvider();

  useEffect(() => {
    // Initialise Yjs ymap
    ymap?.observe((event) => {
      // Update with changes
      setState(state.map((button) => {
        const newActive = ymap?.get(button.value);
        return {value: button.value, active: newActive};
      }));
    });
  }, []);

  return (
    <div>
      {state.map((b, index) => (
        <button
          key={index}
          onClick={() => {
            const newState = [...state];
            const newActive = !b.active;
            newState[index] = { value: b.value, active: newActive };
            setState(newState);
            ymap?.set(b.value, newActive);
          }}
          style={{ background: b.active ? "green" : "grey" }}
        >
          {b.value}
        </button>
      ))}
    </div>
  );
};
