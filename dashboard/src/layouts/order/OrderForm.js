import { Alert, Checkbox, FormControl, FormControlLabel, MenuItem, Modal, Select, TextField, Tooltip } from "@mui/material"
import ArgonBox from "components/ArgonBox"
import ArgonButton from "components/ArgonButton";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography"
import { useEffect, useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { createTrip } from "services/order";
import { getProvinces } from "services/order";
import { editTrip } from "services/order";
import { deleteTrip } from "services/order";

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
    price: "",
    provinceEnd: "_",
    provinceStart: "_",
    timeStart: "2022-04-17T15:30"
};

const OrderFormModal = ({ order, open, handleClose, refresh, mode }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState("")
    const [formSuccess, setFormSuccess] = useState(false)

    const [provinces, setProvinces] = useState([])

    useEffect(() => {
        if (order) {
            const { price, provinceStart, provinceEnd, timeStart } = order
            setFormData({
                price,
                provinceEnd,
                provinceStart,
                timeStart
            })
        }
    }, [order])

    useEffect(() => {
        (async () => {
            const provincesData = await getProvinces()
            setProvinces(provincesData)
        })()
    }, [])

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(order.tripId);
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

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: Number(value),
        }));
    }

    const handleTimeChange = val => {
        setFormData(prevS => ({
            ...prevS,
            timeStart: val["$d"]
        }))
    }

    const handleDelete = async () => {
        try {
            await deleteTrip(order.tripId)

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
            const date = new Date(formData.timeStart)
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            const timeStart = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            const payload = {
                ...formData,
                timeStart

            }

            if (!order) {
                await createTrip(payload)
            }

            if (order) {
                await editTrip(order.tripId, payload)
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
                    {order ? "Edit information" : "New order"}
                </ArgonTypography>
                <form onSubmit={handleSubmit}>
                    {(mode === "VIEW" && order)
                        && (
                            <Tooltip title="Copy">
                                <ArgonBox sx={{ cursor: 'pointer' }} onClick={handleCopyToClipboard}>
                                    <ArgonInput
                                        name="tripId"
                                        placeholder="ID"
                                        defaultValue={order.tripId}
                                        sx={{ my: 1 }}
                                        required
                                        fullWidth
                                        disabled={mode === "VIEW"}
                                    />
                                </ArgonBox>
                            </Tooltip>
                        )
                    }

                    <FormControl
                        variant="outlined"
                        fullWidth
                        sx={{
                            my: 1,
                            '& .MuiInputBase-formControl, & .MuiSelect-select': { display: "block !important", margin: 0, width: "100% !important" },
                        }}

                    >
                        <Select
                            value={formData.provinceStart}
                            onChange={handleInputChange}
                            name="provinceStart"
                            label="Province start"
                            required
                            sx={{ width: "100%" }}
                            disabled={mode === "VIEW"}
                        >
                            <MenuItem value="_" disabled>
                                Select start point*
                            </MenuItem>
                            {provinces.map((option) => (
                                <MenuItem key={option.provinceId} value={option.location[0].name}>
                                    {option.location[0].name} - {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        fullWidth
                        margin="8px"
                        sx={{
                            '& .MuiInputBase-formControl, & .MuiSelect-select': { display: "block !important", margin: 0, width: "100% !important" },
                        }}

                    >
                        <Select
                            value={formData.provinceEnd}
                            onChange={handleInputChange}
                            name="provinceEnd"
                            label="Province end"
                            required
                            sx={{ width: "100%" }}
                            disabled={mode === "VIEW"}
                        >
                            <MenuItem value="_" disabled>
                                Select end point*
                            </MenuItem>
                            {provinces.map((option) => (
                                <MenuItem key={option.provinceId} value={option.location[0].name}>
                                    {option.location[0].name} - {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <ArgonInput
                        name="price"
                        placeholder="Price*"
                        value={formData.price}
                        onChange={handlePriceChange}
                        sx={{ my: 1 }}
                        type="number"
                        required
                        disabled={mode === "VIEW"}
                        fullWidth
                    />
                    <DatePicker
                        sx={{ mb: 1 }}
                        value={dayjs(formData.timeStart)}
                        disabled={mode === "VIEW"}
                        onChange={handleTimeChange}
                    />
                    <TimePicker
                        sx={{ mb: 1, ml: "4px" }}
                        value={dayjs(formData.timeStart)}
                        disabled={mode === "VIEW"}
                        onChange={handleTimeChange}

                    />

                    {formSuccess && <ArgonBox sx={{ my: 2 }}> <Alert severity="success">Success</Alert> </ArgonBox>}
                    {formError && <ArgonBox sx={{ my: 2 }}> <Alert severity="error">Action failed</Alert> </ArgonBox>}

                    <ArgonBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ArgonButton type="submit" variant="contained" color="primary">
                            {order ? "Update" : "Create"}
                        </ArgonButton>
                        {order
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

export default OrderFormModal