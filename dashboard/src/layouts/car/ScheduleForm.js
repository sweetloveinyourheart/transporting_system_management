import { Alert, Modal } from "@mui/material"
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import { useEffect, useState } from "react";
import { addDriverForCar } from "services/car";
import { addTripForCar } from "services/car";

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
    carId: ""
}

const ScheduleFormModal = ({ car, open, handleClose, refresh, type }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)

    useEffect(() => {
        if (car && type === "TRIP") {
            setFormData({
                tripId: "",
                carId: car.carId
            })
        }

        if (car && type === "DRIVER") {
            setFormData({
                employeeId: "",
                carId: car.carId
            })
        }

    }, [car])

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (type === "TRIP") {
                await addTripForCar(formData)
            }

            if (type === "DRIVER") {
                await addDriverForCar(formData)
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
                    {"New car schedule"}
                </ArgonTypography>
                <form onSubmit={handleSubmit}>
                    <ArgonInput
                        name="carId"
                        placeholder="Car ID*"
                        value={formData.carId}
                        onChange={handleInputChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                    />

                    {type === "TRIP"
                        && (
                            <ArgonInput
                                name="tripId"
                                placeholder="Trip ID*"
                                value={formData.tripId}
                                onChange={handleInputChange}
                                sx={{ my: 1 }}
                                required
                                fullWidth
                            />
                        )
                    }

                    {type === "DRIVER"
                        && (
                            <ArgonInput
                                name="employeeId"
                                placeholder="Employee ID*"
                                value={formData.employeeId}
                                onChange={handleInputChange}
                                sx={{ my: 1 }}
                                required
                                fullWidth
                            />
                        )
                    }

                    {formSuccess && <ArgonBox sx={{ my: 2 }}> <Alert severity="success">Success</Alert> </ArgonBox>}
                    {formError && <ArgonBox sx={{ my: 2 }}> <Alert severity="error">Action failed</Alert> </ArgonBox>}

                    <ArgonBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ArgonButton type="submit" variant="contained" color="primary">
                            {"Create new schedule"}
                        </ArgonButton>
                    </ArgonBox>
                </form>
            </ArgonBox>
        </Modal>
    )
}

export default ScheduleFormModal