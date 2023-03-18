import Header from "@/components/organism/header";
import Sidebar from "@/components/organism/sidebar";
import SummaryPage from "./summary";

export default function Home() {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <Header />
          <SummaryPage />
        </div>
      </div>
    </>
  );
}
