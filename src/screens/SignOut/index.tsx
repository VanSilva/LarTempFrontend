import React, { useEffect } from "react";
import { useAuth } from "../../contexts/auth";

export function SignOut() {
  const { handleSetPerson } = useAuth();

  useEffect(() => {
    handleSetPerson(null, 'signOut');
  }, []);

  return <></>;
}
