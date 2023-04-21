import { Alert, Checkbox, FormControl, FormControlLabel, MenuItem, Modal, Select, Tooltip } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { editEmployeeProfile } from "services/user";
import { changeUserRole } from "services/user";
import { editUserProfile } from "services/user";

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
    fullName: '',
    phoneNumber: '',
    email: '',
    address: '',
    status: true,
};

const roles = [
    "DRIVER",
    "USER",
    "EMPLOYEE"
]


const EditUserModal = ({ accountId, user, open, handleClose, role, refresh, mode }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)

    const [selectedRole, setSelectedRole] = useState(role)

    useEffect(() => {
        if (user) {
            const { fullName, phoneNumber, email, address, status, employeeDTO } = user
            setFormData({
                fullName,
                phoneNumber,
                email,
                address,
                status,
                yoe: employeeDTO.yoe,
                dob: employeeDTO.dob
            })
        }
    }, [user])

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(user.employeeDTO.employeeId);
    };

    const onHandleClose = () => {
        setFormError("")
        setFormSuccess(false)
        setFormData(initialFormData)
        setSelectedRole(role)
        handleClose()
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            status: event.target.checked,
        }));
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { yoe, dob, ...userData } = formData
            await editUserProfile(user.userId, userData)
            await editEmployeeProfile(user.employeeDTO.employeeId, { yoe, dob })

            if (role !== selectedRole) {
                await changeUserRole(accountId, { roleId: selectedRole })
            }

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
                    Edit information
                </ArgonTypography>
                <form onSubmit={handleSubmit}>

                    {mode === "VIEW"
                        && (
                            <Tooltip title="Copy">
                                <ArgonBox sx={{ cursor: 'pointer' }} onClick={handleCopyToClipboard}>
                                    <ArgonInput
                                        name="employeeId"
                                        placeholder="Employee Id"
                                        defaultValue={user.employeeDTO.employeeId}
                                        sx={{ my: 1 }}
                                        required
                                        fullWidth
                                        disabled={mode === "VIEW"}
                                    />
                                </ArgonBox>
                            </Tooltip>
                        )
                    }

                    <ArgonInput
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                        disabled={mode === "VIEW"}
                    />
                    <ArgonInput
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        disabled={mode === "VIEW"}
                        fullWidth
                    />
                    <ArgonInput
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                        disabled={mode === "VIEW"}
                    />
                    <ArgonInput
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                        disabled={mode === "VIEW"}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.status}
                                onChange={handleCheckboxChange}
                                name="status"
                                color="primary"
                                disabled={mode === "VIEW"}
                            />
                        }
                        label="Status"
                        sx={{ m: 0, my: 1 }}
                    />

                    {role !== "USER"
                        && (
                            <>
                                <ArgonInput
                                    name="yoe"
                                    placeholder="Year of experience"
                                    value={formData.yoe}
                                    onChange={handleYOEChange}
                                    sx={{ my: 1 }}
                                    required
                                    fullWidth
                                    disabled={mode === "VIEW"}
                                />
                                <DatePicker
                                    value={dayjs(formData.dob)}
                                    onChange={val => handleDOBChange(val, 'dob')}
                                    name="dob"
                                    placeholder="Date of birth"
                                    disabled={mode === "VIEW"}
                                    sx={{
                                        mb: 1
                                    }}
                                />
                            </>
                        )
                    }

                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiInputBase-formControl, & .MuiSelect-select': { display: "block !important", margin: 0, width: "100% !important" },
                            mb: 1
                        }}

                    >
                        <Select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            label="Role"
                            required
                            sx={{ width: "100%" }}
                            disabled={mode === "VIEW"}
                        >
                            {roles.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
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

export default EditUserModal