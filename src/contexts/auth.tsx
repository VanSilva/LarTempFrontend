import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IPerson {
  id: string;
  signed: boolean;
  eLar: boolean;
  token: boolean;
}

interface IAuthContextProps {
  person: IPerson | null;
  handleSetPerson: (person: IPerson | null, action: string) => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextProps);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [person, setPerson] = useState<IPerson | null>({} as IPerson);

  useEffect(() => {
    async function getPersonFromAsyncStorage() {
      const person = JSON.parse((await AsyncStorage.getItem("person")) || "");

      if (person?.id !== null) {
        setPerson(person);
      }
    }

    getPersonFromAsyncStorage();
  }, []);

  const handleSetPerson = async (person: IPerson | null, action: string) => {
    if (action === "signIn") {
      setPerson(person);
      await AsyncStorage.setItem("person", JSON.stringify(person));
    } else if (action === "signOut") {
      setPerson(null);
      await AsyncStorage.removeItem("person");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        person,
        handleSetPerson,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
