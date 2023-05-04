import Modal from "@/components/atoms/modal";
import { fetch } from "@/utils/network";
import { useState } from "react";

const UpdateDeviceModal = ({ device, onCancel }) => {
  const [hostInput, setHostInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const updateDevice = async (data) => {
    try {
      const response = await fetch.put(`devices/${device.id}`, {
        host: hostInput,
        username: usernameInput,
        password: passwordInput,
        use_payload: true,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateDevice({
      device_type: deviceType,
      host: hostInput,
      username: usernameInput,
      password: passwordInput,
    });

    console.log(response);

    // setLoading(false);

    // if (response.status_code && response.status_code !== 200) {
    //   setErrors(response.detail);
    // } else {
    //   onSuccess();
    //   setErrors(null);
    // }
  };

  return (
    <Modal>
      <Modal.Header>Update Device {device.hostname}</Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <button
          type="submit"
          // disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-slate-200 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center"
          onClick={onSubmit}
        >
          Update
          {/* {isLoading && <Loading className="ml-2" />} */}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDeviceModal;
