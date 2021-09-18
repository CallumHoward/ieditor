import React, { FunctionComponent } from "react";
import "./App.css";
import { EditorPage } from "./pages/editor-page";

export const App: FunctionComponent = () => {
  return (
    <div className="App">
      <EditorPage />
    </div>
  );
};
