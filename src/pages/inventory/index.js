import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "@/utils/network";
import { fetchDeviceList } from "@/store/deviceList/deviceListSlice";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import AddDeviceModal from "@/components/molecules/addDeviceModal";
import ActionButton from "@/components/molecules/actionButton";
import SummaryTable from "@/components/molecules/summaryTable";
import UpdateDeviceModal from "@/components/molecules/updateDeviceModal";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const navigateDevice = (e, id) => {
    e.preventDefault();
    router.push("/inventory/" + id);
  };

  const insertDevice = async (data) => {
    try {
      const response = await fetch.post("devices", data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const deleteDevice = async ({ id }) => {
    try {
      const response = await fetch.delete(`devices/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const data = useSelector((state) =>
    state.deviceList.data.map((data) => ({
      ...data,
      action: (
        <ActionButton
          searchAction={(e) => navigateDevice(e, data.id)}
          deleteAction={(e) => deleteDevice({ id: data.id })}
        />
      ),
    }))
  );

  const onSuccessInsert = () => {
    setShowModal(false);
    dispatch(fetchDeviceList());
  };

  useEffect(() => {
    dispatch(fetchDeviceList());
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-end">
        <Button title="Add Device" onClick={() => setShowModal(true)} />
      </div>
      {/* <UpdateDeviceModal /> */}
      <Card>
        <Text className="text-xl font-medium mb-2">Device List</Text>
        <SummaryTable
          columns={[
            {
              Header: "Hardware",
              accessor: "hardware",
            },
            {
              Header: "Hostname",
              accessor: "hostname",
            },
            {
              Header: "Rommon",
              accessor: "rommon",
            },
            {
              Header: "Serial",
              accessor: "serial",
            },
            {
              Header: "Version",
              accessor: "version",
            },
            {
              Header: "Action",
              accessor: "action",
            },
          ]}
          data={data}
        />
      </Card>
      {showModal && (
        <AddDeviceModal
          action={insertDevice}
          close={() => setShowModal(false)}
          onSuccess={onSuccessInsert}
        />
      )}
    </div>
  );
};

export default InventoryPage;
