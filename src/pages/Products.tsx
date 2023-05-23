import { useState } from "react";
import CustomTable from "../components/Table/Table";
import { formatDate, padNumber } from "../components/Table/utils";
import "./Products.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Products() {
  const rowsPerPage = 10;
  const [tablePage, setTablePage] = useState(1);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [tableOrder, setTableOrder] = useState({
    order: "asc",
    orderBy: "createdAt",
  });

  const tableHeader = [
    {
      id: "id",
      numeric: false,
      disablePadding: false,
      label: "S. No.",
      render: (text: any, row: any, index: any, data: any) =>
        padNumber(index + 1 + rowsPerPage * (tablePage - 1), 1),
    },
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Product Name",
      sortable: false,
    },
    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price",
      sortable: false,
    },
    {
      id: "image",
      numeric: false,
      disablePadding: false,
      label: "Image",
      sortable: false,
      render: (text: any, row: any, index: any, data: any) => (
        <img src={row.image} className="product-image" />
      ),
    },
    {
      id: "createdAt",
      numeric: false,
      disablePadding: false,
      label: "Created At",
      sortable: true,
      render: (text: any) => formatDate(text),
    },
    {
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
      sortable: false,
      render: (text: any, row: any) => (
        <Button
          variant="outlined"
          onClick={() => {
            navigate(`/${row.id}`);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const tableData = [
    {
      id: "1",
      name: "Test123",
      price: "120",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Test123",
      price: "1204",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      createdAt: new Date(),
    },
  ];

  const handlePageChange = (page: number) => {
    setTablePage(page);
  };

  const handleSortChange = (order: string, orderBy: string) => {
    setTableOrder({ order, orderBy });
  };

  return (
    <div>
      <div className="form-fieldset search-product-wrapper">
        <input
          placeholder="Enter Product Name"
          className="form-input search-product"
          id="productName"
          type="text"
          name="productName"
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
        <Button variant="outlined" onClick={() => {}}>
          Search
        </Button>
      </div>
      <CustomTable
        tableHeader={tableHeader}
        tableData={tableData}
        totalRecords={tableData.length}
        sortingRequired={true}
        paginationServerSide={true}
        page={tablePage}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        sortingServerSide={true}
        order={tableOrder.order}
        orderBy={tableOrder.orderBy}
        onSortChange={handleSortChange}
        rowclickable={false}
        isLoading={false}
        paginationRequired={true}
      />
    </div>
  );
}

export default Products;
