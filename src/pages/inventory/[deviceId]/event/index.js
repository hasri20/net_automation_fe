import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchCPU, fetchDevice, fetchMemory } from "@/store/device/action";
import Link from "next/link";
import Text from "@/components/atoms/text";
import Card from "@/components/atoms/card";
import SummaryTable from "@/components/molecules/summaryTable";

const DeviceEvent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.device.data);
  const { deviceId } = router.query;

  useEffect(() => {
    if (deviceId) {
      dispatch(fetchDevice(deviceId));
    }
  }, [deviceId]);

  return (
    <div className="m-4">
      <div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <li className="mr-2">
            <Link
              href={`/inventory/${deviceId}`}
              aria-current="page"
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            >
              General
            </Link>
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
              className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
            >
              Event &amp; Alarm
            </Link>
          </li>
        </ul>
      </div>
      <Card className="mt-4">
        <Text className="text-xl font-medium mb-2">Event and Alarm</Text>
        <SummaryTable
          columns={[
            {
              Header: "Messages",
              accessor: "message",
            },
          ]}
          data={data?.logging?.message.map((data) => ({ message: data }))}
        />
      </Card>
    </div>
  );
};

export default DeviceEvent;
