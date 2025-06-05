/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { ProgressSpinner } from "primereact/progressspinner";
import { maskEmail, maskPhoneNumber } from "../utils/additionalFunc";

export default function SSDataTable({ data }) {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  console.log("Data in SSDataTable:", products);

  useEffect(() => {
    setTimeout(() => {
      setProducts(data.partners);
      console.log(data.partners)
      setLoading(false);
    }, 1000);
  }, [data]);


  const statusBodyTemplate = (product) => {
    return product.hasActive ? (
      <Tag value="Active" severity="success" />
    ) : (
      <Tag value="Inactive" severity="danger" />
    )
  };

  if (loading) {
    return (
      <ProgressSpinner
        style={{
          width: "50px",
          height: "50px",
          left: "50%",
          top: "50%",
          position: "relative",
        }}
      />
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const maskEmailTemplate = (row) => {
    return maskEmail(row?.email);
  };

  const maskMobileTemplate = (row) => {
    return maskPhoneNumber(row?.mobile);
  };

  const dateTemplate = (row) => {
    const date = new Date(row?.createdAt);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return (
    <div className=" mar-top">
      <DataTable
        className="SSDataTable"
        value={products}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="name" header="Username" />
        <Column field="sponsorId" header="User ID" />
        <Column field="email" header="Email" />
        <Column body={dateTemplate} header="Date of Joining" />
        <Column header="Status" body={statusBodyTemplate} />
      </DataTable>
    </div>
  );
}
