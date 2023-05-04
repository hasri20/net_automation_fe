import {
  SearchOutlined as LogoSearch,
  CloudUploadOutlined as LogoUpload,
} from "@ant-design/icons";

const BackupActionButton = ({ viewAction, restoreAction }) => {
  return (
    <div className="flex gap-1">
      <div
        className="flex items-center p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={viewAction}
      >
        <LogoSearch style={{ fontSize: "13px", color: "#000000" }} />
      </div>
      <div
        className="flex items-center p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={restoreAction}
      >
        <LogoUpload style={{ fontSize: "13px", color: "#000000" }} />
      </div>
    </div>
  );
};

export default BackupActionButton;
