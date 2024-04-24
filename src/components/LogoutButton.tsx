import { Button } from "flowbite-react";
import { Modal } from "./Modal";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { IconLogout } from "@/icons";

export const LogoutButton = () => {
  const authContext = useAuthContext();

  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    setOpenModal(true);
  };

  const logout = () => {
    authContext?.logout().then(() => {
      setOpenModal(false);
    });
  };

  return (
    <>
      <Button size="xs" gradientMonochrome="failure" onClick={handleLogout}>
        <IconLogout className="h-4 w-4 mr-1" />
        Logout
      </Button>
      <Modal
        title="Confirm logout"
        body="Are you sure you want to log out? "
        // ¿Estás seguro de que quieres cerrar sesión?
        setOpen={setOpenModal}
        open={openModal}
        primaryButton={
          <Button
            size="xs"
            color="failure"
            onClick={() => {
              logout();
            }}
          >
            <IconLogout className="h-4 w-4 mr-1" />
            Logout
          </Button>
        }
      />
    </>
  );
};
