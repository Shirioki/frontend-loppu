import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import AddTraining from './AddTraining';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
    dayjs.extend(utc);

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchCustomer = async (link) => {
            const response = await fetch(link, { signal });
            const data = await response.json();
            return data;
        };

        const fetchData = async () => {
            try {
                const trainingsResponse = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', { signal });
                const trainingsData = await trainingsResponse.json();
                const trainingsList = trainingsData._embedded.trainings;

                let customersData = [];
                for (const training of trainingsList) {
                    const processCustomer = fetchCustomer(training._links.customer.href);
                    customersData.push(processCustomer);
                }

                const customersList = await Promise.all(customersData);
                customersList.forEach((customer, index) => {
                    trainingsList[index].customerName = `${customer.firstname} ${customer.lastname}`;
                });

                setTrainings(trainingsList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, []);


    const deleteTraining = (params) => {
        if (window.confirm("Do you want to delete the training?")) {
            fetch(params.data._links.training.href, { method: "Delete" })
                .then(response => {
                    if (response.ok) {
                        fetchData();
                    }
                });
        }
    };

    const addTraining = (training, customerId) => {
        training.customer = customerId;
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: "POST", headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(true);
                    fetchTrainings();
                } else {
                    setOpenSnackbar(true);
                }
            })
            .catch(error => {
                console.error("Error adding customer:", error);
                setOpenSnackbar(true);
            });
    };

    const columnDefs = [
        {
            field: 'date',
            sortable: true,
            filter: true,
            valueFormatter: params => {
                if (params.data.date) {
                    const formattedDate = dayjs.utc(params.data.date).format('DD-MM-YYYY HH:mm');
                    return formattedDate;
                }
                return null;
            }
        },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        { field: 'customerName', sortable: true, filter: true },
        {
            cellRenderer: (params) =>
                <Button size="small" color="error" onClick={() => deleteTraining(params)}>Delete</Button>,
            width: 120
        }
    ];

    return (
        <>
        <div>
            <AddTraining addTraining={addTraining} />           
            <h2>Training list</h2>
            <div className="ag-theme-material" style={{ width: 1280, height: 1000 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </div>
        </>
    );
}
