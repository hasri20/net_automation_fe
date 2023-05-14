import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevice } from "@/store/device/action";
import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";

const DeviceDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { interfaceIndex, deviceId } = router.query;
  const data = useSelector((state) => state.device.data?.interfaces);
  let interfaceData = data && data[interfaceIndex];

  useEffect(() => {
    if (deviceId) {
      dispatch(fetchDevice(deviceId));
    }
  }, [deviceId]);

  return (
    <div className="m-4">
      <div className="flex flex-row gap-4 mt-4">
        <Card className="basis-1/2">
          <div className="text-center mb-4">
            <Text className="text-xl font-medium mb-2">General Info</Text>
          </div>
          <div className="flex justify-evenly ">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Interface:</td>
                    <td className="pl-2">{interfaceData?.interface}</td>
                  </tr>
                  <tr>
                    <td>Link Status:</td>
                    <td className="pl-2">{interfaceData?.link_status}</td>
                  </tr>
                  <tr>
                    <td>Protocol Status:</td>
                    <td className="pl-2">{interfaceData?.protocol_status}</td>
                  </tr>
                  <tr>
                    <td>Address:</td>
                    <td className="pl-2">{interfaceData?.address}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td className="pl-2">{interfaceData?.description}</td>
                  </tr>
                  <tr>
                    <td>IP Address:</td>
                    <td className="pl-2">{interfaceData?.ip_address}</td>
                  </tr>
                  <tr>
                    <td>MTU:</td>
                    <td className="pl-2">{interfaceData?.mtu}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ml-8">
              <table>
                <tbody>
                  <tr>
                    <td>Duplex:</td>
                    <td className="pl-2">{interfaceData?.duplex}</td>
                  </tr>
                  <tr>
                    <td>Speed:</td>
                    <td className="pl-2">{interfaceData?.speed}</td>
                  </tr>
                  <tr>
                    <td>Media Type:</td>
                    <td className="pl-2">{interfaceData?.media_type}</td>
                  </tr>

                  <tr>
                    <td>Bandwith:</td>
                    <td className="pl-2">{interfaceData?.bandwidth}</td>
                  </tr>
                  <tr>
                    <td>Delay:</td>
                    <td className="pl-2">{interfaceData?.delay}</td>
                  </tr>
                  <tr>
                    <td>Encapsulation:</td>
                    <td className="pl-2">{interfaceData?.encapsulation}</td>
                  </tr>
                  <tr>
                    <td>VLAN ID:</td>
                    <td className="pl-2">{interfaceData?.vlan_id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
        <Card className="basis-1/2">
          <div className="text-center mb-4">
            <Text className="text-xl font-medium mb-2">Counters</Text>
          </div>
          <div className="flex justify-evenly ">
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>Last Input:</td>
                    <td className="pl-2">{interfaceData?.last_input}</td>
                  </tr>
                  <tr>
                    <td>Last Output:</td>
                    <td className="pl-2">{interfaceData?.last_output}</td>
                  </tr>
                  <tr>
                    <td>Last Output Hang:</td>
                    <td className="pl-2">{interfaceData?.last_output_hang}</td>
                  </tr>
                  <tr>
                    <td>Input Rate:</td>
                    <td className="pl-2">{interfaceData?.input_rate}</td>
                  </tr>
                  <tr>
                    <td>Output Rate:</td>
                    <td className="pl-2">{interfaceData?.output_rate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="ml-8">
              <table>
                <tbody>
                  <tr>
                    <td>Input Packets:</td>
                    <td className="pl-2">{interfaceData?.input_packets}</td>
                  </tr>
                  <tr>
                    <td>Output Packets:</td>
                    <td className="pl-2">{interfaceData?.output_packets}</td>
                  </tr>
                  <tr>
                    <td>Input Errors:</td>
                    <td className="pl-2">{interfaceData?.input_errors}</td>
                  </tr>
                  <tr>
                    <td>CRC:</td>
                    <td className="pl-2">{interfaceData?.crc}</td>
                  </tr>
                  <tr>
                    <td>Output Errors:</td>
                    <td className="pl-2">{interfaceData?.output_errors}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
