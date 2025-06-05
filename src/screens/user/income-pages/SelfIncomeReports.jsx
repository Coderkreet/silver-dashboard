import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ReportContent } from "../../../constants/content/dummy/ReportContent";
import { useSelector } from "react-redux";

const SelfIncomeReports = () => {
    // eslint-disable-next-line no-unused-vars
    // const [data, setData] = useState(ReportContent);

    // const userInfo = useSelector((state) => state.userInfo.userInfo);

    // useEffect(() => {
    //     if (userInfo) {
    //         const filteredData = userInfo?.user?.selftIncomes || [];
    //         setData(filteredData);
    //         console.log(filteredData);
    //     }
    // }, [userInfo]);

    // const serialNumberTemplate = (rowData, { rowIndex }) => {
    //     return rowIndex + 1;
    // };
    // const dateTimeTemplate = (rowData) => {
    //     return new Date(rowData.createdAt).toLocaleString();
    // };

    const data = [
        {
            id: 1,
            clientId: "TXN12345",
            amount: 5000,
            createdAt: "2024-03-12T10:30:00Z",
        },
        {
            id: 2,
            clientId: "TXN12346",
            amount: 7500,
            createdAt: "2024-03-11T14:15:00Z",
        },
        {
            id: 3,
            clientId: "TXN12347",
            amount: 4200,
            createdAt: "2024-03-10T09:45:00Z",
        },
        {
            id: 4,
            clientId: "TXN12348",
            amount: 8900,
            createdAt: "2024-03-09T16:20:00Z",
        },
        {
            id: 5,
            clientId: "TXN12349",
            amount: 3100,
            createdAt: "2024-03-08T08:00:00Z",
        },
    ];

    // Serial Number Template
    const serialNumberTemplate = (rowData, options) => {
        return options.rowIndex + 1;
    };

    // Date-Time Template
    const dateTimeTemplate = (rowData) => {
        return new Date(rowData.createdAt).toLocaleString();
    };

    return (
        <div className="Reports SelfIncomeReports martop">
            <div className="dataTable ss-card martop">
                <DataTable
                    value={data}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    filterDisplay="row"
                >
                    <Column
                        style={{ width: "10%" }}
                        body={serialNumberTemplate}
                        header="S.No"
                        filter
                        sortable
                    />
                    <Column
                        field="clientId"
                        header="Transition Id"
                        filter
                        sortable
                    />
                    <Column field="amount" header="Amount" filter sortable />
                    <Column
                        field="createdAt"
                        body={dateTimeTemplate}
                        header="Income Date"
                        filter
                        sortable
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default SelfIncomeReports;
