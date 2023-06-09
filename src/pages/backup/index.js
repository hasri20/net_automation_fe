import { fetchBackupList } from "@/store/backupList/action";
import { fetch } from "@/utils/network";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/atoms/button";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import BackupActionButton from "@/components/molecules/backupActionButton";
import CreateBackupModal from "@/components/molecules/createBackupModal";
import ShowBackupModal from "@/components/molecules/showBackupModal";
import SummaryTable from "@/components/molecules/summaryTable";
import Swal from "sweetalert2";

const BackupPage = () => {
  const dispatch = useDispatch();
  const [showBackupFileModal, setShowBackupFileModal] = useState(false);
  const [showCreateBackupModal, setShowCreateBackupModal] = useState(false);

  const restoreBackup = async (id) => {
    const response = await fetch.post(`restore/${id}`);
    if (response.data.status === "Success") {
      Swal.fire({
        title: "Success",
        text: "Configuration restored",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Restore Error",
        text: response.data.detail,
      });
    }
  };

  const data = useSelector((state) =>
    state.backupList.data.map((data) => ({
      ...data,
      action: (
        <BackupActionButton
          viewAction={(e) => setShowBackupFileModal(data.id)}
          restoreAction={(e) => restoreBackup(data.id)}
        />
      ),
    }))
  );

  const onCreateBackup = async ({ deviceId }) => {
    if (!deviceId) {
      return;
    }

    const response = await fetch.post(`backup/${deviceId}`);
    if (response.status === 200) {
      setShowCreateBackupModal(false);
      Swal.fire({
        title: "Success",
        text: "Backup Created",
        icon: "success",
        confirmButtonText: "Ok",
      });
      dispatch(fetchBackupList());
    } else {
      setShowCreateBackupModal(false);
      Swal.fire({
        icon: "error",
        title: "Create Backup Error",
        text: response.data.detail,
      });
    }
  };

  useEffect(() => {
    dispatch(fetchBackupList());
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowCreateBackupModal(true)}>
          Create Backup
        </Button>
      </div>
      <Card>
        <Text className="text-xl font-medium mb-4">All Backup Files</Text>
        <SummaryTable
          columns={[
            {
              Header: "Hostname",
              accessor: "hostname",
            },
            {
              Header: "Filename",
              accessor: "filename",
            },
            {
              Header: "Created At",
              accessor: "created_at",
            },
            {
              Header: "Action",
              accessor: "action",
            },
          ]}
          data={data}
        />
      </Card>
      {showBackupFileModal && (
        <ShowBackupModal
          id={showBackupFileModal}
          close={() => setShowBackupFileModal(false)}
        />
      )}
      {showCreateBackupModal && (
        <CreateBackupModal
          onCreate={onCreateBackup}
          onClose={() => setShowCreateBackupModal(false)}
        />
      )}
    </div>
  );
};

export default BackupPage;
