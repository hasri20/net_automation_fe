import Button from "@/components/atoms/button";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import ProvisionModal from "@/components/molecules/provisionModal";
import ShowTemplateModal from "@/components/molecules/showTemplateModal/showTemplateModal";
import UploadTemplateModal from "@/components/molecules/uploadTemplateModal";
import { fetch } from "@/utils/network";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProvisioningPage = () => {
  const [templateList, setTemplateList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showUploadTemplateModal, setShowUploadTemplateModal] = useState(false);

  const fetchTemplateList = async () => {
    const response = await fetch.get("provision");
    setTemplateList(response.data);
  };

  const onProvision = async ({ deviceId }) => {
    if (!deviceId) {
      return;
    }

    const response = await fetch.post(`provision/${showModal}/${deviceId}`);
    setShowModal(false);

    if (response.data.status_code === 500) {
      Swal.fire({
        icon: "error",
        title: "Provision Error",
        text: response.data.detail,
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Device Provisioned",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  useEffect(() => {
    fetchTemplateList();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <Text className="text-xl font-medium mb-4">
          Configuration Template for Provisioning
        </Text>
        <Button
          className="cursor-pointer"
          onClick={() => setShowUploadTemplateModal(true)}
        >
          Upload Template
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {templateList.map((template) => (
          <Card key={template.id}>
            <div className="flex flex-col justify-between h-full">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {template.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {template.description}
                </p>
              </div>
              <div className="mt-4 flex">
                <Button onClick={(e) => setShowTemplateModal(template.id)}>
                  View
                </Button>
                <Button
                  className="ml-2"
                  onClick={() => setShowModal(template.id)}
                >
                  Push
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {showModal && (
        <ProvisionModal
          onProvision={onProvision}
          onClose={() => setShowModal(false)}
        />
      )}
      {showTemplateModal && (
        <ShowTemplateModal
          id={showTemplateModal}
          close={() => setShowTemplateModal(false)}
        />
      )}

      {showUploadTemplateModal && (
        <UploadTemplateModal
          onClose={() => setShowUploadTemplateModal(false)}
        />
      )}
    </div>
  );
};

export default ProvisioningPage;
