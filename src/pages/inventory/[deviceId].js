import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import SummaryTable from "@/components/molecules/summaryTable";
import { fetchDevice } from "@/store/device/deviceSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "@/components/atoms/lineChart";
import { fetch } from "@/utils/network";

const fetchMemory = async (deviceId) => {
  const response = await fetch.get(`/monitor/memory/${deviceId}`);
  return response.data;
};

const fetchCPU = async (deviceId) => {
  const response = await fetch.get(`/monitor/cpu/${deviceId}`);
  return response.data;
};

const DeviceDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { deviceId } = router.query;
  const data = useSelector((state) => state.device.data);

  useEffect(() => {
    let interval;
    if (deviceId) {
      dispatch(fetchDevice(deviceId));

      interval = setInterval(async () => {
        try {
          const memoryUsage = await fetchMemory(deviceId);
          ApexCharts.exec("memory", "appendData", [
            {
              data: [memoryUsage.usedPercentage],
            },
          ]);
        } catch (e) {
          console.log(e);
        }

        try {
          const cpuUsage = await fetchCPU(deviceId);
          ApexCharts.exec("cpu", "appendData", [
            {
              data: [cpuUsage.usage],
            },
          ]);
        } catch (e) {
          console.log(e);
        }
      }, 3000);
    }
    return () => {
      window.clearInterval(interval);
    };
  }, [deviceId]);

  return (
    <div className="m-4">
      <div className="flex flex-row gap-4">
        <Card className="basis-1/5">
          <table>
            <tbody>
              <tr>
                <td>Hostname:</td>
                <td>{data.hostname}</td>
              </tr>
              <tr>
                <td>Version:</td>
                <td>{data.version}</td>
              </tr>
              <tr>
                <td>Serial:</td>
                <td>{data.serial}</td>
              </tr>
              <tr>
                <td>Hardware:</td>
                <td>{data.hardware}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
      <div className="mt-4">
        <Card>
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
      <div className="flex mt-4 gap-4">
        <Card className="basis-1/2 ">
          <Text className="text-xl font-medium mb-2">Memory Usage</Text>
          <LineChart id="memory" />
        </Card>
        <Card className="basis-1/2 ">
          <Text className="text-xl font-medium mb-2">CPU Usage</Text>
          <LineChart id="cpu" />
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
