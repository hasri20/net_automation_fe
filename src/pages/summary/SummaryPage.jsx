import Card from "@/components/atoms/card";
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
        <SummaryCard className="basis-1/3" />
        <SummaryCard className="basis-1/3" />
        <SummaryCard className="basis-1/3" />
      </div>

      <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-4">
        <Card className="col-span-2 row-span-3">
          <SummaryTable
            columns={[
              {
                Header: "Hardware",
                accessor: "hardware",
              },
              {
                Header: "Hostname",
                accessor: "hostname",
              },
              {
                Header: "Rommon",
                accessor: "rommon",
              },
              {
                Header: "Serial",
                accessor: "serial",
              },
              {
                Header: "Version",
                accessor: "version",
              },
            ]}
            data={data}
          />
        </Card>
        <Card className="row-span-2"></Card>
        <Card className=""></Card>
      </div>
    </div>
  );
};

export default SummaryPage;
