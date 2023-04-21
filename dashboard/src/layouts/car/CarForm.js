import { Alert, Checkbox, FormControlLabel, Modal } from "@mui/material"
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import { useEffect, useState } from "react";
import { createCar, deleteCar } from "services/car";

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
    carNumber: "",
    numberOfChair: 30,
    status: true
};

const CarFormModal = ({ car, open, handleClose, refresh, mode }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)


    useEffect(() => {
        if (car) {
            const { carNumber, numberOfChair, status, tripId } = car
            setFormData({
                carNumber,
                numberOfChair,
                status
            })
        }
    }, [car])


    const onHandleClose = () => {
        setFormError("")
        setFormSuccess(false)
        setFormData(initialFormData)
        handleClose()
    }

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    const handleCheckboxChange = (event) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            status: event.target.checked,
        }));
    };

    const handleInputWithNumberChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: Number(value),
        }));
    }

    const handleDelete = async () => {
        try {
            await deleteCar(car.tripId)

            setFormError("")
            setFormSuccess(true)
            setFormData(initialFormData)
        } catch (error) {
            setFormSuccess(false)
            setFormError("Update information failed. Please check and try again !")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!car) {
                await createCar(formData)
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
                    {car ? "Edit information" : "New car"}
                </ArgonTypography>
                <form onSubmit={handleSubmit}>
                    {(mode === "VIEW" && car)
                        && (
                            <ArgonInput
                                name="tripId"
                                placeholder="ID"
                                defaultValue={car.carId}
                                sx={{ my: 1 }}
                                required
                                fullWidth
                                disabled={mode === "VIEW"}
                            />
                        )
                    }

                    <ArgonInput
                        name="carNumber"
                        placeholder="Car number*"
                        type="number"
                        value={formData.carNumber}
                        onChange={handleInputWithNumberChange}
                        sx={{ my: 1 }}
                        required
                        fullWidth
                        disabled={mode === "VIEW"}
                    />

                    <ArgonInput
                        name="numberOfChair"
                        placeholder="Number Of Chair*"
                        value={formData.numberOfChair}
                        onChange={handleInputWithNumberChange}
                        sx={{ my: 1 }}
                        type="number"
                        required
                        disabled
                        fullWidth
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.status}
                                onChange={handleCheckboxChange}
                                name="status"
                                color="primary"
                                disabled={!car || mode === "VIEW"}
                            />
                        }
                        label="Status"
                        sx={{ m: 0, my: 1 }}
                    />

                    {formSuccess && <ArgonBox sx={{ my: 2 }}> <Alert severity="success">Success</Alert> </ArgonBox>}
                    {formError && <ArgonBox sx={{ my: 2 }}> <Alert severity="error">Action failed</Alert> </ArgonBox>}

                    <ArgonBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ArgonButton type="submit" variant="contained" color="primary">
                            {car ? "Update" : "Create"}
                        </ArgonButton>
                        {car
                            && (
                                <ArgonButton type="button" variant="outlined" color="error" onClick={handleDelete}>
                                    Delete
                                </ArgonButton>
                            )
                        }
                    </ArgonBox>
                </form>
            </ArgonBox>
        </Modal>
    )
}

export default CarFormModal