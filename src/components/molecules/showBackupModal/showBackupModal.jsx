import { useEffect, useState } from "react";
import { fetch } from "@/utils/network";
import Modal from "@/components/atoms/modal";
import Button from "@/components/atoms/button";

const ShowBackupModal = ({ id, close }) => {
  const [content, setContent] = useState("");

  const fetchBackup = async () => {
    try {
      const response = await fetch.get(`backup/${id}`);
      console.log(response);
      setContent(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBackup();
  }, []);

  return (
    <Modal>
      <Modal.Header>
        <div className="flex justify-between w-full">
          <div>Backup file</div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="block p-2.5 w-full h-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          disabled={true}
          value={content}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <Button onClick={close}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowBackupModal;
