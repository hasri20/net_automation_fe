import Card from "@/components/atoms/card";
import Text from "@/components/atoms/text";
import SummaryTable from "@/components/molecules/summaryTable";

const BackupPage = () => {
  const data = [
    {
      // device_id: {
      //   $oid: "642adab69548ca2bb4b0cc58",
      // },
      filename: "R7200_NEW - 2023-04-19 17:53:13 - backup.txt",
      // inserted_at: {
      //   $date: "2023-04-19T17:53:13Z",
      // },
      id: "643fc8191f5f09ae5941759e",
    },
  ];
  return (
    <div className="m-4">
      <Card>
        <Text className="mb-4">All Backup Files</Text>
        <SummaryTable
          columns={[
            {
              Header: "Hostname",
              accessor: "hostname",
            },
            {
              Header: "Filename",
              accessor: "filename",
            },
            {
              Header: "Created At",
              accessor: "inserted_at",
            },
            {
              Header: "Action",
              accessor: "action",
            },
          ]}
          data={data}
        />
      </Card>
    </div>
  );
};

export default BackupPage;
