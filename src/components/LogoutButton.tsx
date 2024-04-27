import { useState } from "react";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

import { IconLogout } from "@/icons";

import { useAuthContext } from "@/contexts/AuthContext";

import { Modal } from "./Modal";

export const LogoutButton = () => {
  const authContext = useAuthContext();
  const { t } = useTranslation();

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
        {t("signOut.buttonLabel")}
      </Button>
      <Modal
        title={t("modal.title")}
        body={t("modal.message")}
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
            {t("signOut.buttonLabel")}
          </Button>
        }
      />
    </>
  );
};
