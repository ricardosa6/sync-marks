import { useState } from "react";
import { Button } from "flowbite-react";

import { Modal } from "@/modules/shared/components";
import { IconCloud } from "@/modules/shared/icons";

import { LOCK, SYNC_BOOKMARKS, UNLOCK } from "@/modules/shared/utils";

export const SyncButton = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSync = () => {
    setOpenModal(true);
  };

  const syncBookmarks = async () => {
    setLoading(true);
    await chrome.runtime.sendMessage({ message: LOCK });
    await chrome.runtime.sendMessage({ message: SYNC_BOOKMARKS });
    await chrome.runtime.sendMessage({ message: UNLOCK });
    setLoading(false);
    setOpenModal(false);
  };

  return (
    <>
      <Button
        disabled={loading}
        gradientDuoTone="greenToBlue"
        isProcessing={loading}
        onClick={handleSync}
        size="xs"
      >
        <IconCloud className="mr-2 h-5 w-5" />
        {chrome.i18n.getMessage("home_sync")}
      </Button>
      <Modal
        body={chrome.i18n.getMessage("home_syncModal_message")}
        open={openModal}
        primaryButton={
          <Button
            isProcessing={loading}
            disabled={loading}
            size="xs"
            color="success"
            onClick={syncBookmarks}
          >
            <IconCloud className="h-4 w-4 mr-1" />
            {chrome.i18n.getMessage("home_sync")}
          </Button>
        }
        setOpen={setOpenModal}
        title={chrome.i18n.getMessage("home_syncModal_title")}
      />
    </>
  );
};
