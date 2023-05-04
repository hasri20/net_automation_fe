import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetch } from "@/utils/network";
import { fetchDeviceList } from "@/store/deviceList/deviceListSlice";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import Button from "@/components/atoms/button";
import AddDeviceModal from "@/components/molecules/addDeviceModal";
import ActionButton from "@/components/molecules/inventoryActionButton";
import SummaryTable from "@/components/molecules/summaryTable";
import UpdateDeviceModal from "@/components/molecules/updateDeviceModal";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState({
    isShow: false,
    data: null,
  });

  const navigateDevice = (e, id) => {
    e.preventDefault();
    router.push("/inventory/" + id);
  };

  const refreshDevice = async ({ data }) => {
    try {
      const response = await fetch.put(`devices/${data.id}`, {});

      if (response.data.status_code === 500) {
        setShowUpdateModal({ isShow: true, data });
      } else {
        dispatch(fetchDeviceList());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDevice = async ({ id }) => {
    try {
      await fetch.delete(`devices/${id}`);
      dispatch(fetchDeviceList());
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
          editAction={(e) => refreshDevice({ data })}
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
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowModal(true)}>Add Device</Button>
      </div>
      {showUpdateModal.isShow && (
        <UpdateDeviceModal
          device={showUpdateModal.data}
          onCancel={() => setShowUpdateModal({ isShow: false, data: null })}
        />
      )}
      <Card>
        <Text className="text-xl font-medium mb-4">Device List</Text>
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
          close={() => setShowModal(false)}
          onSuccess={onSuccessInsert}
        />
      )}
    </div>
  );
};

export default InventoryPage;
