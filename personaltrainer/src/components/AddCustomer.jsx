import React from 'react';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';

export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', email: '', streetaddress: '', postcode: '', city: '', phone: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label="Firstname"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label="Lastname"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label="Email"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label="Street Address"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label="Postcode"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label="City"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label="Phone"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}