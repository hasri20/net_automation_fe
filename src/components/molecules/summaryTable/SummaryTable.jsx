import { useMemo } from "react";
import { useTable } from "react-table";

const SummaryTable = ({ columns, data }) => {
  if (columns) {
    const columnsMemo = useMemo(() => columns, [columns]);
    const dataMemo = useMemo(() => data, [data]);

    const tableInstance = useTable({ columns: columnsMemo, data: dataMemo });
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      tableInstance;

    return (
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()} className="px-6 py-3">
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b text-gray-900 hover:bg-gray-50 "
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()} className="px-6 py-3">
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  return <></>;
};

export default SummaryTable;
