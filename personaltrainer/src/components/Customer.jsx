import React, { useEffect, useState } from 'react';
import {AgGridReact} from "ag-grid-react";
import {Button} from "@mui/material";
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import { CSVLink } from "react-csv";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function Customer() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => { fetchData(); }, []);
    
    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => {setCustomers(data._embedded.customers)})
            .catch(error => console.log(error));
    }

    const deleteCustomer = (params) => {
        if (window.confirm("Do you want to delete the customer?")) {
            fetch(params.data._links.customer.href, { method: "Delete" })
                .then(response => {
                    if (response.ok) {
                        fetchData();
                    } else {
                        alert("Something went wrong");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    const saveCustomer = (newCustomer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => fetchData())
            .catch(error => console.error(error));
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchData())
            .catch(error => console.error(error));
    }

    const CsvCustomer = customers ? customers.map((customer) => ({
        FirstName: customer.firstname,
        LastName: customer.lastname,
        Address: customer.streetaddress,
        Postcode: customer.postcode,
        City: customer.city,
        Email: customer.email,
        Phone: customer.phone
    })) : [];

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {cellRenderer: (params) => <EditCustomer updateCustomer={updateCustomer} params={params} />, },
        {cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteCustomer(params)}>Delete</Button>, width: 120}
    ]);

    

    return (
        <>
        <h2 >Customer list</h2>
        <AddCustomer saveCustomer={saveCustomer} />
        <div>
            <CSVLink data={CsvCustomer} filename={"customers.csv"}>Download CSV</CSVLink>
        </div>
        <div className="ag-theme-material" style={{width: 1280, height: 1000}}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
            />
        </div>
    </>
    );
}