import Table from "examples/Tables/Table";
import ArgonBox from "components/ArgonBox";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import ArgonTypography from "components/ArgonTypography";
import { getAllCar } from "services/car";
import CarFormModal from "./CarForm";
import ArgonButton from "components/ArgonButton";
import ArgonBadge from "components/ArgonBadge";
import ScheduleFormModal from "./ScheduleForm";

const tableData = {
    columns: [
        { name: "car_number", align: "center" },
        { name: "seats", align: "center" },
        { name: "trips", align: 'center' },
        { name: "status", align: "center" },
        { name: "action", align: "center" }
    ],
};

const CarTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { columns } = tableData;
    const [cars, setCars] = useState([])

    const [openCarModal, setOpenCarModal] = useState(false)
    const [openScheduleModal, setOpenScheduleModal] = useState(false)

    const [selectedCar, setSelectedCar] = useState(null)
    const [modalMode, setModalMode] = useState("VIEW")
    const [scheduleMode, setScheduleMode] = useState("TRIP")

    const refresh = async () => {
        const data = await getAllCar(currentPage - 1)
        if (!data) return;

        setCars(data.content)
        setTotalPages(data.totalPages)
    }

    useEffect(() => {
        (async () => {
            await refresh()
        })()
    }, [currentPage])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const onNewCarClick = () => {
        setSelectedCar(null)
        setOpenCarModal(true)
        setModalMode("NEW")
    }

    const onViewCar = (acc) => {
        setModalMode("VIEW")
        setSelectedCar(acc)
        setOpenCarModal(true)
    }

    const onEditCar = (acc) => {
        setSelectedCar(acc)
        setOpenCarModal(true)
        setModalMode("EDIT")
    }

    const onCloseEdit = () => {
        setOpenCarModal(false)
        setSelectedCar(null)
        setModalMode("VIEW")
    }

    const onNewScheduleClick = (acc, type) => {
        setSelectedCar(acc)
        setScheduleMode(type)
        setOpenScheduleModal(true)
    }

    const onCloseSchedule = () => {
        setSelectedCar(null)
        setScheduleMode("TRIP")
        setOpenScheduleModal(false)
    }

    return (
        <>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">
                    Cars table
                </ArgonTypography>
                <ArgonButton variant="contained" color="primary" onClick={onNewCarClick}>
                    New car
                </ArgonButton>
            </ArgonBox>
            <ArgonBox
                sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                        "& td": {
                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                `${borderWidth[1]} solid ${borderColor}`,
                        },
                    },
                }}
            >
                <Table
                    columns={columns}
                    rows={cars.map((car) => {
                        return ({
                            car_number: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="bold">
                                    {car.carNumber}
                                </ArgonTypography>
                            ),
                            status: (
                                <ArgonBadge
                                    variant="gradient"
                                    badgeContent={car.status ? "available" : "unavailable"}
                                    color={car.status ? "success" : "secondary"}
                                    size="xs"
                                    container
                                />
                            ),
                            seats: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {car.chair.length}
                                </ArgonTypography>
                            ),
                            trips: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {car.tripId.length}
                                </ArgonTypography>
                            ),
                            action: (
                                <ArgonBox sx={{ display: "flex" }}>
                                    {/* <ArgonTypography
                                        component="a"
                                        href="#"
                                        variant="caption"
                                        color="secondary"
                                        fontWeight="medium"
                                        onClick={() => onViewCar(car)}
                                    >
                                        View
                                    </ArgonTypography> */}
                                    <ArgonBadge
                                        variant="gradient"
                                        badgeContent={"Edit"}
                                        color={"Error"}
                                        size="xs"
                                        container
                                        sx={{ ml: 1, cursor: 'pointer', '& > span': { width: 75 } }}
                                        onClick={() => onEditCar(car)}
                                    />
                                    <ArgonBadge
                                        variant="gradient"
                                        badgeContent={"+ Trip"}
                                        color={"warning"}
                                        size="xs"
                                        container
                                        sx={{ ml: 1, cursor: 'pointer', '& > span': { width: 75 } }}
                                        onClick={() => onNewScheduleClick(car, "TRIP")}
                                    />
                                    <ArgonBadge
                                        variant="gradient"
                                        badgeContent={"+ Driver"}
                                        color={"primary"}
                                        size="xs"
                                        container
                                        sx={{ ml: 1, cursor: 'pointer', '& > span': { width: 75 } }}
                                        onClick={() => onNewScheduleClick(car, "DRIVER")}
                                    />
                                </ArgonBox>
                            ),
                        })
                    })}
                />
            </ArgonBox>
            <ArgonBox display="flex" justifyContent="center" alignItems="center" p={3}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    siblingCount={0}
                    boundaryCount={2}
                />
            </ArgonBox>

            <CarFormModal
                car={selectedCar}
                open={openCarModal}
                handleClose={onCloseEdit}
                refresh={refresh}
                mode={modalMode}
            />

            <ScheduleFormModal
                car={selectedCar}
                open={openScheduleModal}
                handleClose={onCloseSchedule}
                refresh={refresh}
                type={scheduleMode}
            />
        </>
    )
}

export default CarTable