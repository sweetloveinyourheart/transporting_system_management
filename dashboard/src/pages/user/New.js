import { Alert, Divider, Modal } from "@mui/material"
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import { useState } from "react";
import { newAccount } from "services/auth";

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
    username: "",
    password: "",
    retypePassword: "",
    user: {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: ""
    }
};

const NewUserModal = ({ open, handleClose, refresh }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)

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

    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            user: {
                ...prevFormData.user,
                [name]: value,
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { retypePassword, ...newUser } = formData
            // Submit
            if (retypePassword !== newUser.password) {
                setFormSuccess(false)
                setFormError("Password isn't match !")
                return;
            }
            await newAccount(newUser)

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
                    New users
                </ArgonTypography>
                <form onSubmit={handleSubmit}>
                    <ArgonInput
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth

                    />
                    <ArgonInput
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                    />
                    <ArgonInput
                        name="retypePassword"
                        type="password"
                        placeholder="Retype password"
                        value={formData.retypePassword}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth

                    />
                    <Divider />
                    <ArgonInput
                        name="fullName"
                        placeholder="Fullname"
                        value={formData.user.fullName}
                        onChange={handleUserInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth

                    />
                    <ArgonInput
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.user.phoneNumber}
                        onChange={handleUserInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth


                    />
                    <ArgonInput
                        name="email"
                        placeholder="Email"
                        value={formData.user.email}
                        onChange={handleUserInputChange}
                        sx={{ my: 1 }}
                        required
                        type="email"
                        fullWidth

                    />
                    <ArgonInput
                        name="address"
                        placeholder="Address"
                        value={formData.user.address}
                        onChange={handleUserInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth


                    />

                    {formSuccess && <ArgonBox sx={{ my: 2 }}> <Alert severity="success">Success</Alert> </ArgonBox>}
                    {formError && <ArgonBox sx={{ my: 2 }}> <Alert severity="error">{formError}</Alert> </ArgonBox>}

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

export default NewUserModal