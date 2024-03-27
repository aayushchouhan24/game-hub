import { useEffect, useState } from "react";
import {
  ref,
  onValue,
  off,
  set,
  update,
  remove,
  DataSnapshot,
} from "firebase/database";
import { database } from "../services/firebase";

interface Prop {
  isLoading: boolean;
  snapshot: DataSnapshot | null;
  addValue: (value: any, path?: string) => void;
  updateValue: (value: any, path?: string) => void;
  deleteValue: (path?: string) => void;
}

function useFirebase(path: string): Prop {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [snapshot, setSnapshot] = useState<DataSnapshot | null>(null);

  useEffect(() => {
    const dbRef = ref(database, path);
    const handleData = (snapshot: DataSnapshot) => {
      setSnapshot(snapshot);
      setLoading(false); // Set loading to false once data is fetched
    };
    onValue(dbRef, handleData);
    return () => {
      off(dbRef, "value", handleData);
    };
  }, [path]);

  const addValue = (data: any, p: string | undefined) => {
    const dbRef = ref(database, p ? p : path);
    set(dbRef, data);
  };

  const updateValue = (updates: any, p: string | undefined) => {
    const dbRef = ref(database, p ? p : path);
    update(dbRef, updates);
  };

  const deleteValue = (p: string | undefined) => {
    const dbRef = ref(database, p ? p : path);
    remove(dbRef);
  };

  return { isLoading, snapshot, addValue, updateValue, deleteValue };
}

export default useFirebase;
