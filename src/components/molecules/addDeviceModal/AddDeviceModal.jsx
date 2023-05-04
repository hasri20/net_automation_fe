import { useState } from "react";
import { LoadingOutlined as Loading } from "@ant-design/icons";
import Text from "@/components/atoms/text";

const AddDeviceModal = ({ close, onSuccess }) => {
  const [deviceType, setDeviceType] = useState("cisco_ios");
  const [hostInput, setHostInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const insertDevice = async (data) => {
    try {
      const response = await fetch.post("devices", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await insertDevice({
      device_type: deviceType,
      host: hostInput,
      username: usernameInput,
      password: passwordInput,
    });

    setLoading(false);

    if (response.status_code && response.status_code !== 200) {
      setErrors(response.detail);
    } else {
      onSuccess();
      setErrors(null);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-black bg-opacity-50">
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">Add Device</h3>
          </div>
          <form onSubmit={onSubmit}>
            <div className="p-6 space-y-6">
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
              <div>
                <Text className="text-red-500">{errors}</Text>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
              <button
                type="submit"
                disabled={isLoading}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 disabled:bg-slate-200 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center"
              >
                Connect
                {isLoading && <Loading className="ml-2" />}
              </button>
              <button
                type="button"
                onClick={close}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeviceModal;
