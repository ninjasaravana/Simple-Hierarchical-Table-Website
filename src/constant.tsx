export interface heirarchialTableDataType {
    rows: {
        id: string;
        label: string;  
        value: number;
        children?: {
            id: string;
            label: string;
            value: number;
        }[];
}[];
}

export interface TableRowProps {
    id: string;
    label: string;
    value: number;
    variance: number;
    isParent?: boolean;
    groupName?: string;
}

export const heirarchialTableData:heirarchialTableDataType = {
  "rows": [
    {
      "id": "electronics",
      "label": "Electronics",
      "value": 1400, //this value needs to be calculated from the children values (800+700)
      "children": [
        {
          "id": "phones",
          "label": "Phones",
          "value": 800
        },
        {
          "id": "laptops",
          "label": "Laptops",
          "value": 700
        }
      ]
    },
    {
      "id": "furniture",
      "label": "Furniture",
      "value": 1000, //this need to be calculated from the children values (300+700)
      "children": [
        {
          "id": "tables",
          "label": "Tables",
          "value": 300
        },
        {
          "id": "chairs",
          "label": "Chairs",
          "value": 700
        }
      ]
    }
  ]
}