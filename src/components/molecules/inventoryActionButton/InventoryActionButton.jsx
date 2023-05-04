import {
  SearchOutlined as LogoSearch,
  ReloadOutlined as LogoEdit,
  DeleteOutlined as LogoDelete,
} from "@ant-design/icons";

const InventoryActionButton = ({ searchAction, editAction, deleteAction }) => {
  return (
    <div className="flex gap-1">
      <div
        className="flex items-center p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={searchAction}
      >
        <LogoSearch style={{ fontSize: "13px", color: "#000000" }} />
      </div>
      <div
        className="flex items-center p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={editAction}
      >
        <LogoEdit style={{ fontSize: "13px", color: "#000000" }} />
      </div>
      <div
        className="flex items-center p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
        onClick={deleteAction}
      >
        <LogoDelete style={{ fontSize: "13px", color: "#000000" }} />
      </div>
    </div>
  );
};

export default InventoryActionButton;
