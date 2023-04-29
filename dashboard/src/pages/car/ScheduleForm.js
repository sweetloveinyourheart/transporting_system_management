import { Alert, Autocomplete, Modal, TextField } from "@mui/material"
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import { useEffect, useState } from "react";
import { addDriverForCar } from "services/car";
import { addTripForCar } from "services/car";
import { getAllTrip } from "services/trip";
import { getDrivers } from "services/user";
import { getFormattedDate } from "utils/getCurrentDate";

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

    const [place, setPlace] = useState("")
    const [trips, setTrips] = useState([])
    const [selectedTrip, setSelectedTrip] = useState('')

    const [driverEmail, setDriverEmail] = useState("")
    const [drivers, setDrivers] = useState([])
    const [selectedDriver, setSelectedDriver] = useState('')

    useEffect(() => {
        if(type === "TRIP") {
            (async () => {
                const tripList = await getAllTrip(0, place)
                setTrips(tripList.content.map((el) => ({
                    label: `${el.provinceStart} - ${el.provinceEnd} - ${getFormattedDate(el.timeStart)}`,
                    tripId: el.tripId
                })))
            })()
        }

        if(type === "DRIVER") {
            (async () => {
                const driverList = await getDrivers(0, driverEmail)
                console.log(driverList);

                setDrivers(driverList.content.map((el) => ({
                    label: `${el.user.email} - ${el.user.fullName}`,
                    employeeId: el.user.employeeDTO.employeeId
                })))
            })()
        }
    }, [type, place])

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
                        defaultValue={car?.carNumber}
                        sx={{ my: 1 }}
                        disabled
                        fullWidth
                    />

                    {type === "TRIP"
                        && (
                            <Autocomplete
                                disableClearable
                                value={selectedTrip}
                                onChange={(event, newValue) => {
                                    setFormData(prevS => ({...prevS, tripId: newValue.tripId}))
                                    setSelectedTrip(newValue);
                                }}
                                inputValue={place}
                                onInputChange={(event, newInputValue) => {
                                    setPlace(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={trips}
                                sx={{ mb:1 }}
                                fullWidth
                                renderInput={(params) => <TextField placeholder="Search trip by place" {...params} />}
                            />
                        )
                    }

                    {type === "DRIVER"
                        && (
                            <Autocomplete
                                disableClearable
                                value={selectedDriver}
                                onChange={(event, newValue) => {
                                    setFormData(prevS => ({...prevS, employeeId: newValue.employeeId}))
                                    setSelectedDriver(newValue);
                                }}
                                inputValue={driverEmail}
                                onInputChange={(event, newInputValue) => {
                                    setDriverEmail(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={drivers}
                                sx={{ mb:1 }}
                                fullWidth
                                renderInput={(params) => <TextField placeholder="Search driver by email" {...params} />}
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