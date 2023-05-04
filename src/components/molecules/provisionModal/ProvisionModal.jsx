import Button from "@/components/atoms/button";
import Modal from "@/components/atoms/modal";
import { fetch } from "@/utils/network";
import { useEffect, useState } from "react";

const ProvisionModal = ({ onProvision, onClose }) => {
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");

  const fetchDeviceList = async () => {
    try {
      const response = await fetch.get("devices");
      setDeviceList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDeviceList();
  }, []);

  return (
    <Modal>
      <Modal.Header>
        <div className="flex justify-between w-full">
          <div>Select Device for Provision</div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <label
          htmlFor="select-device"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Select Device
        </label>
        <select
          id="select-device"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-0"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          <option value="">Select Device</option>
          {deviceList.map((device) => (
            <option key={device.id} value={device.id}>
              {device.hostname}
            </option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <Button
            onClick={() => onProvision({ deviceId: selectedDevice })}
            className="mr-2"
          >
            Provision
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ProvisionModal;
