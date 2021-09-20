import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const initialState = [
  { value: "hello", active: true },
  { value: "world", active: false },
  { value: "foobar", active: true },
];

export const ListPage: FunctionComponent = () => {
  const [state, setState] = useState(initialState);
  const ydoc = useRef(new Y.Doc());
  const provider = useRef(
    new WebsocketProvider(`wss:yjs-demos.now.sh`, "buttons", ydoc.current)
  );
  const ymap = useRef(ydoc.current.getMap("buttons"));
  // const undoManager = useRef(new Y.UndoManager(ymap.current));

  useEffect(() => {
    // Initialise Yjs ymap
    ymap.current.observe((event) => {
      // Update with changes
      setState(state.map((button) => {
        const newActive = ymap.current.get(button.value);
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
            ymap.current.set(b.value, newActive);
          }}
          style={{ background: b.active ? "green" : "grey" }}
        >
          {b.value}
        </button>
      ))}
    </div>
  );
};
