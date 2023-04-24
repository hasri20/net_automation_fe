import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCPU, fetchDevice, fetchMemory } from "@/store/device/action";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import SummaryTable from "@/components/molecules/summaryTable";
import LineChart from "@/components/atoms/lineChart";

const DeviceDetailPage = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { deviceId } = router.query;

  const data = useSelector((state) => state.device.data);

  useEffect(() => {
    if (deviceId) {
      dispatch(fetchDevice(deviceId));
    }
  }, []);
  // useEffect(() => {
  //   if (deviceId) {
  //     dispatch(fetchDevice(deviceId));
  //   }

  //   const interval = setInterval(async () => {
  //     const memoryUsage = await fetchMemory(deviceId);
  //     const cpuUsage = await fetchCPU(deviceId);

  //     if (memoryUsage.status_code === 500) {
  //     } else {
  //       ApexCharts.exec("memory", "appendData", [
  //         {
  //           data: [memoryUsage.usedPercentage],
  //         },
  //       ]);
  //     }

  //     if (cpuUsage.status_code === 500) {
  //     } else {
  //       ApexCharts.exec("cpu", "appendData", [
  //         {
  //           data: [cpuUsage.usage],
  //         },
  //       ]);
  //     }
  //   }, 3000);

  //   return () => window.clearInterval(interval);
  // }, [deviceId]);

  return (
    <div className="m-4">
      <div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <a
              href="#"
              aria-current="page"
              className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >
              General
            </a>
          </li>
          <li className="mr-2">
            <Link
              href={`/inventory/${deviceId}/interface`}
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              Interface
            </Link>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >
              Event &amp; Alarm
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Card className="basis-1/3 flex flex-col items-center">
          <Text>Physical Interfaces</Text>
          <Text>4</Text>
          <Text>Total</Text>

          <div className="flex w-full justify-evenly">
            <div>
              <Text>Up: 4</Text>
            </div>
            <div>
              <Text>Down: 0</Text>
            </div>
          </div>
        </Card>
        <Card className="basis-1/3">
          <Text>Hardware Usage</Text>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">Memory</div>
            <div className="col-span-8 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
            <div className="col-span-2">45%</div>
            <div className="col-span-2">CPU</div>
            <div className="col-span-8 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
            <div className="col-span-2">45%</div>
            <div className="col-span-2">Disk</div>
            <div className="col-span-8 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
            </div>
            <div className="col-span-2">45%</div>
          </div>
        </Card>
        <Card className="basis-1/3">
          <table>
            <tbody>
              <tr>
                <td>Hostname:</td>
                <td className="pl-2">{data.hostname}</td>
              </tr>
              <tr>
                <td>Model:</td>
                <td className="pl-2">{data.hardware}</td>
              </tr>
              <tr>
                <td>Vendor:</td>
                <td className="pl-2">{data.hardware}</td>
              </tr>

              <tr>
                <td>Serial:</td>
                <td className="pl-2">{data.serial}</td>
              </tr>
              <tr>
                <td>Uptime:</td>
                <td className="pl-2">8d</td>
              </tr>
              <tr>
                <td>Version:</td>
                <td className="pl-2">{data.version}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
