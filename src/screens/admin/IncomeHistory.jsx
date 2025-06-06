import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import PageLoader from "../../components/ui/PageLoader";
import { getIncomeHistoryAdmin } from '../../api/admin-api';

const IncomeHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchIncomeHistory = async () => {
        try {
            setLoading(true);
            const response = await getIncomeHistoryAdmin();
            // if (response?.status === 200) {
                setData(response?.history || []);
                console.log("res is this ", data)
            
                
            // }
        } catch (error) {
            console.error("Error fetching income history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomeHistory();
    }, []);

    const serialNumberTemplate = (rowData, { rowIndex }) => {
        return rowIndex + 1;
    };

    const dateTimeTemplate = (rowData) => {
        return new Date(rowData.date).toLocaleString();
    };

    const earnerTemplate = (rowData) => {
        return (
            <div>
                <div>Name: {rowData.earner.name}</div>
                <div>Email: {rowData.earner.email}</div>
            </div>
        );
    };

    const fromUserTemplate = (rowData) => {
        return (
            <div>
                <div>Name: {rowData.fromUser.name}</div>
                <div>Email: {rowData.fromUser.email}</div>
            </div>
        );
    };

    const amountTemplate = (rowData) => {
        return (
            <div>
                <div>Plan Amount: ₹{rowData.planAmount}</div>
                <div>Commission: ₹{rowData.commission}</div>
            </div>
        );
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="WithdrawalReport IncomeHistory martop">
                <div className="dataTable ss-card martop">
                    <DataTable
                        value={data}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        filterDisplay="row"
                        emptyMessage="No income history found."
                        className="p-datatable-sm"
                    >
                        <Column body={serialNumberTemplate} header="S.No" style={{ width: '5%' }} />
                        <Column body={earnerTemplate} header="Earner Details" style={{ width: '20%' }} />
                        <Column body={fromUserTemplate} header="From User" style={{ width: '20%' }} />
                        <Column field="level" header="Level" filter sortable style={{ width: '10%' }} />
                        <Column body={amountTemplate} header="Amount Details" style={{ width: '20%' }} />
                        <Column body={dateTimeTemplate} header="Date" filter sortable style={{ width: '15%' }} />
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default IncomeHistory;
