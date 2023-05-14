import Card from "@/components/atoms/card";
import PieChart from "@/components/atoms/pieChart";
import Text from "@/components/atoms/text";
import SummaryTable from "@/components/molecules/summaryTable";
import {
  devicFaultsLabelSelector,
  devicFaultsSeriesSelector,
  deviceCountLabelSelector,
  deviceCountSeriesSelector,
  deviceStatusLabelSelector,
  deviceStatusSeriesSelector,
  fetchDeviceCount,
  fetchFaultsCount,
  fetchInterfacesRank,
  fetchStatusCount,
} from "@/store/summary/summarySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SummaryPage = () => {
  const dispatch = useDispatch();
  const deviceCountLabel = useSelector(deviceCountLabelSelector);
  const deviceCountSeries = useSelector(deviceCountSeriesSelector);

  const deviceStatusLabel = useSelector(deviceStatusLabelSelector);
  const deviceStatusSeries = useSelector(deviceStatusSeriesSelector);

  const deviceFaultsLabel = useSelector(devicFaultsLabelSelector);
  const deviceFaultsSeries = useSelector(devicFaultsSeriesSelector);

  const interfaceRank = useSelector(
    (state) => state.summary.interfacesRank.data
  );

  useEffect(() => {
    dispatch(fetchDeviceCount());
    dispatch(fetchStatusCount());
    dispatch(fetchFaultsCount());
    dispatch(fetchInterfacesRank());
  }, []);

  return (
    <div className="m-4">
      <div className="flex flex-row gap-4 mb-4">
        <Card className="basis-1/3">
          <Text>Inventory Summary</Text>
          <PieChart
            label={deviceCountLabel}
            series={deviceCountSeries}
            id="inventory-summary"
          />
        </Card>
        <Card className="basis-1/3">
          <Text>Latest Discovery</Text>
          <PieChart
            label={deviceStatusLabel}
            series={deviceStatusSeries}
            id="discovery-summary"
          />
        </Card>
        <Card className="basis-1/3">
          <Text>Faults Summary</Text>
          <PieChart
            label={deviceFaultsLabel}
            series={deviceFaultsSeries}
            id="faults-summary"
          />
        </Card>
      </div>

      <div>
        <Card>
          <Text>Interface Ranking</Text>
          <SummaryTable
            columns={[
              {
                Header: "Hostname",
                accessor: "hostname",
              },
              {
                Header: "Interface Name",
                accessor: "interface",
              },
              {
                Header: "Input Packets (bps)",
                accessor: "input_packets",
              },
              {
                Header: "Output Packets (bps)",
                accessor: "output_packets",
              },
              {
                Header: "Total In/Out (bps)",
                accessor: "total",
              },
            ]}
            data={interfaceRank}
          />
        </Card>
      </div>
    </div>
  );
};

export default SummaryPage;
