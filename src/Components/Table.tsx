import { TableRowProps } from "../constant";
import "../index.css";
import { TableRow } from "./TableRow";
export const TableComponent = ({
  tableData,
  onUpdate,
}: {
  tableData: TableRowProps[];
  onUpdate: (
    id: string,
    label: string,
    value: number,
    isParent: boolean,
    groupName: string,
    type: "percent" | "value"
  ) => void;
}) => {
  return (
    <table
      style={{
        tableLayout: "fixed",
        minWidth: "75%",
        height: "fit-content",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row: TableRowProps) => (
          <TableRow row={row} onUpdate={onUpdate} />
        ))}
      </tbody>
    </table>
  );
};
