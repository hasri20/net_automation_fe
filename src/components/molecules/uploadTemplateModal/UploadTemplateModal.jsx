import { useState } from "react";
import { fetch } from "@/utils/network";
import { CloudUploadOutlined } from "@ant-design/icons";
import { LoadingOutlined as Loading } from "@ant-design/icons";
import Modal from "@/components/atoms/modal";
import Button from "@/components/atoms/button";

const UploadTemplateModal = ({ onClose, onSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [deviceType, setDeviceType] = useState("cisco_ios");
  const [filenameInput, setFilenameInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onFileChange = (event) => {
    setSelectedFiles(event.target.files[0]);
  };

  const onCreate = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("file", selectedFiles);
    formData.append("filename", filenameInput);
    formData.append("title", titleInput);
    formData.append("description", descriptionInput);
    formData.append("device_type", deviceType);

    await fetch.post("provision", formData);
    setLoading(false);
    onSuccess();
  };

  return (
    <Modal>
      <Modal.Header>
        <div className="flex justify-between w-full">
          <div>Upload Template</div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudUploadOutlined
                  style={{ fontSize: "32px", color: "grey" }}
                />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (Text file only)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={onFileChange}
              />
            </label>
          </div>
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            {selectedFiles?.name}
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="device-type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Device Type
          </label>
          <select
            id="device-type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
          >
            <option value="cisco_ios">Cisco IOS</option>
            <option value="cisco_xe">Cisco IOS-XE</option>
            <option value="cisco_xr">Cisco IOS-XR</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="filename"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Filename
          </label>
          <input
            type="text"
            id="filename"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="XYZ Template.txt"
            value={filenameInput}
            onChange={(e) => setFilenameInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="XYZ Template"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="XYZ Template for router XYZ Provisioning"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            required
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <Button onClick={onCreate} className="mr-2" disabled={isLoading}>
            Create
            {isLoading && <Loading className="ml-2" />}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadTemplateModal;
