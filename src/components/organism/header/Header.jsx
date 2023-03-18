import {
  WifiOutlined as WifiLogo,
  BellOutlined as NotificationLogo,
  ExclamationOutlined as WarningLogo,
} from "@ant-design/icons";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="relative inline-flex ml-3">
            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full">
              <WifiLogo />
            </button>
          </div>
          <div className="relative inline-flex ml-3">
            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full">
              <NotificationLogo />
            </button>
          </div>
          <div className="relative inline-flex ml-3">
            <button className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full">
              <WarningLogo />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
