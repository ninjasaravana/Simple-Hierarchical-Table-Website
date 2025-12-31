import React, { useState } from "react";
import "./App.css";
import { TableComponent } from "./Components/Table";
import { heirarchialTableData, TableRowProps } from "./constant";

function getTableData(): TableRowProps[] {
  const result: TableRowProps[] = [];
  heirarchialTableData.rows.forEach((data) => {
    let obj: TableRowProps = {
      id: data.id,
      label: data.label,
      value: 0,
      variance: 0,
    };
    if (data.children && data.children.length > 0) {
      obj.value = data.children.reduce((acc, child) => acc + child.value, 0);
      obj.isParent = true;
    } else {
      obj.value = data.value;
      obj.isParent = false;
    }
    result.push(obj);
    if (data.children && data.children.length > 0) {
      data.children.forEach((child) => {
        result.push({
          id: child.id,
          label: child.label,
          value: child.value,
          groupName: data.label,
          isParent: false,
          variance: 0,
        });
      });
    }
  });
  return result;
}
function App() {
  const [tableData, setTableData] = useState(getTableData());

  function onUpdate(
    id: string,
    label: string,
    value: number,
    isParent: boolean,
    groupName: string,
    type: "percent" | "value"
  ) {
    const originalRow = tableData.find((r) => r.id === id);
    if (!originalRow) return;

    let newValue = value;
    if (type === "percent") {
      newValue = originalRow.value + originalRow.value * (value / 100);
    }
    let updatedData = tableData.map((row) => {
      if (row.id === id) {
        const variance = ((newValue - row.value) / row.value) * 100;
        return { ...row, value: newValue, variance: variance };
      }
      return row;
    });

    // Parent update: Update split value to children
    if (isParent) {
      updatedData = updatedData.map((row) => {
        if (row.groupName === label) {
          const newChildValue = newValue * (row.value / originalRow.value);
          const childVariance = ((newChildValue - row.value) / row.value) * 100;

          return { ...row, value: newChildValue, variance: childVariance };
        }
        return row;
      });
    }

    // Child update - Update the Parent total
    if (!isParent && groupName) {
      const parentOriginal = tableData.find((r) => r.label === groupName);

      updatedData = updatedData.map((row) => {
        if (row.label === groupName && row.isParent) {
          const children = updatedData.filter((c) => c.groupName === groupName);
          const newParentValue = children.reduce((acc, c) => acc + c.value, 0);
          const parentVariance =
            ((newParentValue - parentOriginal!.value) / parentOriginal!.value) *
            100;

          return { ...row, value: newParentValue, variance: parentVariance };
        }
        return row;
      });
    }

    setTableData(updatedData);
  }

  return (
    <div className='App'>
      <header className='App-header'>Simple Heirarchial Table</header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 64px)",
          alignItems: "center",
        }}
      >
        <TableComponent tableData={tableData} onUpdate={onUpdate} />
      </div>
    </div>
  );
}

export default App;
