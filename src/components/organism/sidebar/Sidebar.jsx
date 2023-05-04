import {
  DingtalkOutlined as LogoDashboard,
  AppstoreOutlined as LogoMenu,
  FolderOutlined as LogoFolder,
  UploadOutlined as LogoBackup,
  CopyOutlined as LogoProvision,
} from "@ant-design/icons";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="static h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar lg:w-20 bg-slate-800 p-4">
      <div className="flex justify-center">
        <LogoDashboard style={{ fontSize: "26px", color: "#ffffff" }} />
      </div>
      <div>
        <div className="text-xs uppercase text-white flex justify-center py-4">
          <span className="lg:block text-center w-6">•••</span>
        </div>
        <ul className="mt-3 flex flex-col items-center justify-center">
          <Link href="/">
            <li className="px-2 py-2 rounded-sm mb-2 hover:bg-slate-400 cursor-pointer">
              <LogoMenu style={{ fontSize: "26px", color: "#ffffff" }} />
            </li>
          </Link>
          <Link href="/inventory">
            <li className="px-2 py-2 rounded-sm mb-2 hover:bg-slate-400 cursor-pointer">
              <LogoFolder style={{ fontSize: "26px", color: "#ffffff" }} />
            </li>
          </Link>
          <Link href="/backup">
            <li className="px-2 py-2 rounded-sm mb-2 hover:bg-slate-400 cursor-pointer">
              <LogoBackup style={{ fontSize: "26px", color: "#ffffff" }} />
            </li>
          </Link>
          <Link href="/provisioning">
            <li className="px-2 py-2 rounded-sm mb-2 hover:bg-slate-400 cursor-pointer">
              <LogoProvision style={{ fontSize: "26px", color: "#ffffff" }} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
