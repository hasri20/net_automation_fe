import Button from "@/components/atoms/button";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import ProvisionModal from "@/components/molecules/provisionModal";
import ShowTemplateModal from "@/components/molecules/showTemplateModal/showTemplateModal";
import UploadTemplateModal from "@/components/molecules/uploadTemplateModal";
import { fetch } from "@/utils/network";
import { useEffect, useState } from "react";

const ProvisioningPage = () => {
  const [templateList, setTemplateList] = useState([]);
  const [showModal, setShowModal] = useState({
    isShow: false,
    templateId: null,
  });
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showUploadTemplateModal, setShowUploadTemplateModal] = useState(false);

  const fetchTemplateList = async () => {
    const response = await fetch.get("provision");
    setTemplateList(response.data);
  };

  const onSuccessUpload = () => {
    setShowUploadTemplateModal(false);
    fetchTemplateList();
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
                  onClick={() =>
                    setShowModal({ isShow: true, templateId: template.id })
                  }
                >
                  Push
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {showModal.isShow && (
        <ProvisionModal
          templateId={showModal.templateId}
          onClose={() => setShowModal({ isShow: false, templateId: null })}
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
          onSuccess={onSuccessUpload}
        />
      )}
    </div>
  );
};

export default ProvisioningPage;
