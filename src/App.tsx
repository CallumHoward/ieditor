import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import { EditorPage } from "./pages/editor-page";

export function App() {
  return (
    <div className="App">
      <EditorPage />
    </div>
  );
}
