import Modal from "@/components/atoms/modal/Modal";
import { useState } from "react";

const UpdateDeviceModal = () => {
  const [hostInput, setHostInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  return (
    <Modal>
      <Modal.Header>Update Device</Modal.Header>
      <Modal.Body>
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
            htmlFor="host"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Host
          </label>
          <input
            type="text"
            id="host"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="192.168.100.1"
            value={hostInput}
            onChange={(e) => setHostInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="admin"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDeviceModal;
