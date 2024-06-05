"use client";

import { logOut } from "../../../action/auth/logout";
import { Button } from "../../../components/ui/button";
import { useCurrentUser } from "../../../hooks/use-current-user";

const page = () => {
  const user = useCurrentUser();
  const signOut = async () => {
    await logOut();
  };

  return (
    <div>
      <Button onClick={signOut}>{user?.id}</Button>
    </div>
  );
};

export default page;
