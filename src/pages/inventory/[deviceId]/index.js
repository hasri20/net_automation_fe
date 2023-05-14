import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCPU, fetchDevice, fetchMemory } from "@/store/device/action";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";

const DeviceDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.device.data);
  const { deviceId } = router.query;

  const [memoryUsage, setMemoryUsage] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    if (deviceId) {
      dispatch(fetchDevice(deviceId));
      fetchMemory(deviceId).then((response) => {
        setMemoryUsage(response.usedPercentage);
      });
      fetchCPU(deviceId).then((response) => {
        setCpuUsage(response.usage);
      });
    }
  }, [deviceId]);

  return (
    <div className="m-4">
      <div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
          <li className="mr-2">
            <a
              href="#"
              aria-current="page"
              className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
            >
              General
            </a>
          </li>
          <li className="mr-2">
            <Link
              href={`/inventory/${deviceId}/interface`}
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            >
              Interface
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/inventory/${deviceId}/event`}
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            >
              Event &amp; Alarm
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <Card className="basis-1/3 flex flex-col items-center">
          <Text className="text-xl font-medium mb-2">Physical Interfaces</Text>
          <Text className="text-5xl mb-2">4</Text>
          <Text className="text-xl mb-2">Total</Text>

          <div className="flex w-full justify-evenly text-xl">
            <div className="flex items-center">
              <ArrowUpOutlined className="mr-2" />
              <Text>Up: 4</Text>
            </div>
            <div className="flex items-center">
              <ArrowDownOutlined className="mr-2" />
              <Text>Down: 0</Text>
            </div>
          </div>
        </Card>
        <Card className="basis-1/3">
          <div className="text-center">
            <Text className="text-xl font-medium mb-2">Hardware Usage</Text>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">Memory</div>
            <div className="col-span-8 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: memoryUsage + "%" }}
                />
              </div>
            </div>
            <div className="col-span-2">{memoryUsage + "%"}</div>
            <div className="col-span-2">CPU</div>
            <div className="col-span-8 flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: cpuUsage + "%" }}
                />
              </div>
            </div>
            <div className="col-span-2">{cpuUsage + "%"}</div>
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
                <td className="pl-2">{data?.ssh?.device_type}</td>
              </tr>

              <tr>
                <td>Serial:</td>
                <td className="pl-2">{data.serial}</td>
              </tr>
              <tr>
                <td>Uptime:</td>
                <td className="pl-2">{data.uptime}</td>
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
