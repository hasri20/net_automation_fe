import Button from "@/components/atoms/button";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import ProvisionModal from "@/components/molecules/provisionModal";
import { fetch } from "@/utils/network";
import { useEffect, useState } from "react";

const ProvisioningPage = () => {
  const [templateList, setTemplateList] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        <Button>Upload Template</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {templateList.map((template) => (
          <Card key={template.id}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {template.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {template.description}
            </p>
            <div className="mt-4 flex">
              <Button>View</Button>
              <Button
                className="ml-2"
                onClick={() => setShowModal(template.id)}
              >
                Push
              </Button>
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
    </div>
  );
};

export default ProvisioningPage;
