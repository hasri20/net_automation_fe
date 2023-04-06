import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import Header from "@/components/organism/header";
import Sidebar from "@/components/organism/sidebar";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}
