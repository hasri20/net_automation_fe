import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import Text from "@/components/atoms/text";
import Card from "@/components/atoms/card";
import SummaryTable from "@/components/molecules/summaryTable";

const DeviceDetailInterface = () => {
  const router = useRouter();
  const { deviceId } = router.query;
  const data = useSelector((state) => state.device.data);

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
              className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
            >
              Interface
            </Link>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            >
              Event &amp; Alarm
            </a>
          </li>
        </ul>
      </div>
      <Card className="mt-4">
        <Text className="text-xl font-medium mb-2">Interfaces</Text>
        <SummaryTable
          columns={[
            {
              Header: "interface",
              accessor: "interface",
            },
            {
              Header: "ip address",
              accessor: "ip_address",
            },
            {
              Header: "vlan id",
              accessor: "vlan_id",
            },
            {
              Header: "bandwidth",
              accessor: "bandwidth",
            },
            {
              Header: "mtu",
              accessor: "mtu",
            },
            {
              Header: "description",
              accessor: "description",
            },
            {
              Header: "link status",
              accessor: "link_status",
            },
            {
              Header: "protocol status",
              accessor: "protocol_status",
            },
          ]}
          data={data.interfaces}
        />
      </Card>
    </div>
  );
};

export default DeviceDetailInterface;
