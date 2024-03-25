import { useState } from "react";
import { Button } from "flowbite-react";

import { useAuthContext } from "@/contexts/AuthContext";

import Chrome from "@/lib/chrome/chrome";

export const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const authContext = useAuthContext();

  const handleLogout = () => {
    authContext?.logout();
  };

  const handleSaveBookmarks = async () => {
    setLoading(true);
    return Chrome.saveBookmarks(authContext?.currentUser).finally(() => {
      setLoading(false);
    });
  };

  return (
    <section className="flex justify-between items-center flex-col px-6 h-full flex-1 p-4">
      <div className="">
        <Button
          isProcessing={loading}
          size="sm"
          gradientDuoTone="greenToBlue"
          onClick={handleSaveBookmarks}
        >
          Save current bookmarks
        </Button>
      </div>
      <Button
        size="sm"
        color="failure"
        className=""
        outline
        onClick={handleLogout}
      >
        Logout
      </Button>
    </section>
  );
};
