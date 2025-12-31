import React, { useState } from 'react';
import Button from './Button';
import { TableRowProps } from '../constant';

interface TableRowComponentProps {
    row: TableRowProps;
    onUpdate: (
        id: string,
        label: string,
        value: number,
        isParent: boolean,
        groupName: string,
        type: 'percent' | 'value'
      ) => void;
}

export const TableRow :React.FC<TableRowComponentProps> = ({row, onUpdate}) => {
    
      const [inputValue, setInputValue] = useState("");
    
      const handlePercentageUpdate = (row: TableRowProps) => {
        const val = parseFloat(inputValue);
        if (isNaN(val)) return;
        onUpdate(
          row.id,
          row.label,
          val,
          !!row.isParent,
          row.groupName || "",'percent'
        );
        setInputValue("");
      };
    
      const handleValueUpdate = (row: TableRowProps) => {
        const val = parseFloat(inputValue);
        if (isNaN(val)) return;
        onUpdate(row.id, row.label, val, !!row.isParent, row.groupName || "",'value');
        setInputValue("");
      };
    return (
        <tr>
                    <td style={{textAlign:'left' , ...(row.groupName ? { paddingLeft: "20px" } : {}) }}>
                     {row.groupName ?'→':''} {row.label}
                    </td>
                    <td style={{textAlign:'right'}}>{Number.parseFloat(row.value?.toFixed(4) || "0")}</td>
                    <td>
                      <input
                        type='number'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{height:'24px',width:'80%' , border:'1px solid #ccc', borderRadius:'4px'}}
                      />
                    </td>
                    <td>
                      <Button
                        label={"Allocation %"}
                        type='percent'
                        onClick={() => handlePercentageUpdate(row)}
                      />
                    </td>
                    <td>
                      <Button
                        label={"Allocation Val"}
                        type='value'
                        onClick={() => handleValueUpdate(row)}
                      />
                    </td>
                    <td style={{textAlign:'right'}}>{Number.parseFloat(row.variance?.toFixed(2) || "0")}%</td>
                  </tr>
    );
}