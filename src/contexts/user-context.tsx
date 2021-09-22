import React, {
  FunctionComponent,
  useContext,
  useState,
  createContext,
  useEffect,
  useRef,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { avatars } from "../components/avatar-chooser-styled";
import { useYProvider } from "./yjs-context";

export type User = {
  color: string;
  name?: string;
  phone?: string;
  avatarIndex: number;
  currentIndex: number;
};

export type UserContextProps = {
  id: string;
  allUsers: Record<string, User>;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setAvatarIndex: (avatarIndex: number) => void;
  setCurrentIndex: (currentIndex: number) => void;
} & User;

const colors = ["#0098E3", "#098E56", "#FFAE00", "#CC0007"];

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FunctionComponent = ({ children }) => {
  const id = useRef(uuidv4());
  const color = colors[Math.floor(Math.random() * colors.length)];
  const [name, setName] = useState<string>("Name");
  const [phone, setPhone] = useState<string>();
  const [avatarIndex, setAvatarIndex] = useState<number>(
    Math.floor(Math.random() * avatars.length)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [allUsers, setAllUsers] = useState<Record<string, User>>({});

  const { users } = useYProvider();

  const value: User = {
    color,
    name,
    phone,
    avatarIndex,
    currentIndex,
  };

  const syncName = (name: string) => {
    setName(name);
    users.set(id.current, { ...value, name });
  };
  const syncPhone = (phone: string) => {
    setPhone(phone);
    users.set(id.current, { ...value, phone });
  };
  const syncAvatarIndex = (avatarIndex: number) => {
    setAvatarIndex(avatarIndex);
    users.set(id.current, { ...value, avatarIndex });
  };
  const syncCurrentIndex = (currentIndex: number) => {
    setCurrentIndex(currentIndex);
    users.set(id.current, { ...value, currentIndex });
  };

  useEffect(() => {
    users.observe((event) => {
      event.keysChanged;
      console.log("LOG keysChanged: ", event.keysChanged);
      setAllUsers(users.toJSON());
      console.log("LOG: ", users.toJSON());
    });

    // Take user offline when they disconnect
    const cleanup = () => {
      users.delete(id.current);
    };

    window.addEventListener("beforeunload", cleanup);

    return () => {
      cleanup();
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...value,
        id: id.current,
        allUsers,
        setName: syncName,
        setPhone: syncPhone,
        setAvatarIndex: syncAvatarIndex,
        setCurrentIndex: syncCurrentIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserProvider must be used within a UserProvider");
  }
  return context;
};
