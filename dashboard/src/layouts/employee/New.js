import { Alert, Checkbox, FormControl, FormControlLabel, MenuItem, Modal, Select } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { newEmployee } from "services/auth";
import { getRoles } from "services/auth";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const initialFormData = {
    roleId: "DRIVER",
    yoe: '',
    dob: "2001-01-01 00:00:00"
};

const NewEmployeeModal = ({ open, handleClose, refresh }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [accountId, setAccountId] = useState("")
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)
    const [roles, setRoles] = useState([])

    useEffect(() => {
        (async () => {
            const roles = await getRoles()
            setRoles(roles)
        })()
    }, [])

    const onHandleClose = () => {
        setFormError("")
        setFormSuccess(false)
        setAccountId("")
        setFormData(initialFormData)
        handleClose()
    }

    const handleDOBChange = (val, key) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: dayjs(val["$d"]).format("YYYY-MM-DD HH:MM:ss"),
        }));
    }

    const handleYOEChange = (event) => {
        setFormData(prevS => ({
            ...prevS,
            yoe: Number(event.target.value)
        }))
    }

    const handleAccountIdChange = (event) => {
        setAccountId(event.target.value)
    };

    const handleRoleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            roleId: event.target.value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Submit
            await newEmployee(accountId, formData)

            setFormError("")
            setFormSuccess(true)
            setFormData(initialFormData)

            await refresh()
        } catch (error) {
            setFormSuccess(false)
            setFormError("Update information failed. Please check and try again !")
        }
    };

    return (
        <Modal
            open={open}
            onClose={onHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <ArgonBox sx={style}>
                <ArgonTypography id="modal-modal-title" variant="h6" component="h2">
                    New Employees
                </ArgonTypography>
                <form onSubmit={handleSubmit}>
                    <ArgonInput
                        name="accountId"
                        placeholder="Account ID"
                        value={accountId}
                        onChange={handleAccountIdChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                    />
                    <ArgonInput
                        name="yoe"
                        placeholder="Year of experience"
                        value={formData.yoe}
                        onChange={handleYOEChange}
                        sx={{ my: 1 }}
                        required
                        type="number"
                        fullWidth
                    />
                    <DatePicker
                        value={dayjs(formData.dob)}
                        onChange={val => handleDOBChange(val, 'dob')}
                        name="dob"
                        placeholder="Date of birth"
                        sx={{
                            mb: 1
                        }}
                    />

                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiInputBase-formControl, & .MuiSelect-select': { display: "block !important", margin: 0, width: "100% !important" },
                            mb: 1
                        }}

                    >
                        <Select
                            value={formData.roleId}
                            onChange={handleRoleChange}
                            label="Role"
                            required
                            sx={{ width: "100%" }}
                        >
                            {roles.map((option) => (
                                <MenuItem key={option.roleId} value={option.roleId}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {formSuccess && <ArgonBox sx={{ my: 2 }}> <Alert severity="success">Success</Alert> </ArgonBox>}
                    {formError && <ArgonBox sx={{ my: 2 }}> <Alert severity="error">Action failed</Alert> </ArgonBox>}

                    <ArgonBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ArgonButton type="submit" variant="contained" color="primary">
                            Submit
                        </ArgonButton>
                    </ArgonBox>
                </form>
            </ArgonBox>
        </Modal>
    )
}

export default NewEmployeeModal