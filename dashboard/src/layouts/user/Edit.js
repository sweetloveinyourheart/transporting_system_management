import { Alert, Checkbox, FormControlLabel, Modal, Tooltip } from "@mui/material"
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import { useEffect, useState } from "react";
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

const EditUserModal = ({ accountId, user, open, handleClose, refresh, mode }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)

    useEffect(() => {
        if (user) {
            const { fullName, phoneNumber, email, address, status } = user
            setFormData({
                fullName,
                phoneNumber,
                email,
                address,
                status
            })
        }
    }, [user])

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(accountId);
    };

    const onHandleClose = () => {
        setFormError("")
        setFormSuccess(false)
        setFormData(initialFormData)
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await editUserProfile(user.userId, formData)

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
                                        name="accountId"
                                        placeholder="ID"
                                        defaultValue={accountId}
                                        sx={{ my: 1, position: 'relative' }}
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
                        fullWidth
                        disabled={mode === "VIEW"}

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

                    {formSuccess && <ArgonBox sx={{ my: 2 }}> <Alert severity="success">Success</Alert> </ArgonBox>}
                    {formError && <ArgonBox sx={{ my: 2 }}> <Alert severity="error">Action failed</Alert> </ArgonBox>}

                    {mode === "VIEW"
                        ? (
                            <ArgonBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ArgonButton type="button" variant="contained" color="success" onClick={() => onHandleClose()}>
                                    Close
                                </ArgonButton>
                            </ArgonBox>
                        )
                        : (
                            <ArgonBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <ArgonButton type="submit" variant="contained" color="primary">
                                    Submit
                                </ArgonButton>
                            </ArgonBox>
                        )
                    }
                </form>
            </ArgonBox>
        </Modal>
    )
}

export default EditUserModal