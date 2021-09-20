import React, {
  FunctionComponent,
  useContext,
  useRef,
  createContext,
} from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

type YContextProps = {
  ydoc: Y.Doc;
  provider: WebsocketProvider;
  ymap: Y.Map<any>;
  undoManager: Y.UndoManager;
};

const YContext = createContext<YContextProps | undefined>(undefined);

export const YProvider: FunctionComponent = ({ children }) => {
  const ydoc = useRef(new Y.Doc());
  const provider = useRef(
    new WebsocketProvider(`wss:yjs-demos.now.sh`, "buttons", ydoc.current)
  );
  const ymap = useRef(ydoc.current.getMap("buttons"));
  const undoManager = useRef(new Y.UndoManager(ymap.current));
  return (
    <YContext.Provider
      value={{
        ydoc: ydoc.current,
        provider: provider.current,
        ymap: ymap.current,
        undoManager: undoManager.current,
      }}
    >
      {children}
    </YContext.Provider>
  );
};

export const useYProvider = (): YContextProps => {
  const context = useContext(YContext);
  if (context === undefined) {
    throw new Error("useYProvider must be used within a YProvider");
  }
  return context;
};
