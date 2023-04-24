import Card from "@/components/atoms/card";
import PieChart from "@/components/atoms/pieChart";
import Text from "@/components/atoms/text";
import SummaryCard from "@/components/molecules/summaryCard";
import SummaryTable from "@/components/molecules/summaryTable";
import { fetchDeviceList } from "@/store/deviceList/deviceListSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SummaryPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.deviceList.data);

  useEffect(() => {
    dispatch(fetchDeviceList());
  }, []);

  return (
    <div className="m-4">
      <div className="flex flex-row gap-4 mb-4">
        <Card className="basis-1/3">
          <Text>Inventory Summary</Text>
          <PieChart
            label={["7206VXR", "CSR1000V", "3725"]}
            series={[3, 4, 8]}
            id="inventory-summary"
          />
        </Card>
        <Card className="basis-1/3">
          <Text>Latest Discovery</Text>
          <PieChart
            label={["Discovered", "Unreachable"]}
            series={[13, 2]}
            id="discovery-summary"
          />
        </Card>
        <Card className="basis-1/3">
          <Text>Faults Summary</Text>
          <PieChart
            label={["Critical", "Major", "Minor", "Warning"]}
            series={[3, 4, 8, 2]}
            id="faults-summary"
          />
        </Card>
      </div>

      <div className="grid grid-cols-2 grid-flow-col gap-4">
        <Card>
          <Text>Health Score</Text>
          <SummaryTable
            columns={[
              {
                Header: "Hostname",
                accessor: "hostname",
              },
              {
                Header: "Type",
                accessor: "hardware",
              },

              {
                Header: "Health Score",
              },
            ]}
            data={data}
          />
        </Card>
        <Card className="row-span-2"></Card>
      </div>
    </div>
  );
};

export default SummaryPage;
