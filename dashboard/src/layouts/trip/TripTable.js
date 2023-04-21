import Table from "examples/Tables/Table";
import ArgonBox from "components/ArgonBox";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import ArgonBadge from "components/ArgonBadge";
import ArgonTypography from "components/ArgonTypography";

import dayjs from "dayjs";
import { getAllTrip } from "services/trip";
import TripFormModal from "./TripForm";
import ArgonButton from "components/ArgonButton";

const tableData = {
    columns: [
        { name: "date", align: "center" },
        { name: "time_start", align: "center" },
        { name: "start_at", align: "center" },
        { name: "end_at", align: "center" },
        { name: "price", align: "center" },
        { name: "action", align: "center" },
    ],
};

const TripTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { columns } = tableData;
    const [trips, setTrips] = useState([])

    const [modalMode, setModalMode] = useState("VIEW")
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null)

    const refresh = async () => {
        const data = await getAllTrip(currentPage - 1)
        if (!data) return;

        setTrips(data.content)
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

    const onNewTripClick = () => {
        setModalMode("NEW")
        setSelectedTrip(null)
        setOpenEdit(true)
    }

    const onViewTrip = (acc) => {
        setModalMode("VIEW")
        setSelectedTrip(acc)
        setOpenEdit(true)
    }

    const onEditTrip = (acc) => {
        setSelectedTrip(acc)
        setOpenEdit(true)
        setModalMode("EDIT")
    }

    const onCloseEdit = () => {
        setOpenEdit(false)
        setSelectedTrip(null)
        setModalMode("VIEW")
    }

    return (
        <>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Trips table</ArgonTypography>
                <ArgonButton variant="contained" color="primary" onClick={onNewTripClick}>
                    New Trip
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
                    rows={trips.map((trip) => {
                        return ({
                            date: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {dayjs(trip.timeStart).format("DD/MM/YYYY")}
                                </ArgonTypography>
                            ),
                            time_start: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {dayjs(trip.timeStart).format("HH:mm:ss")}
                                </ArgonTypography>
                            ),
                            start_at: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {trip.provinceStart}
                                </ArgonTypography>
                            ),
                            end_at: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {trip.provinceEnd}
                                </ArgonTypography>
                            ),
                            price: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {Intl.NumberFormat().format(trip.price)} đ
                                </ArgonTypography>
                            ),
                            action: (
                                <ArgonBox sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ArgonTypography
                                        component="a"
                                        href="#"
                                        variant="caption"
                                        color="secondary"
                                        fontWeight="medium"
                                        onClick={() => onViewTrip(trip)}
                                    >
                                        View
                                    </ArgonTypography>
                                    <ArgonTypography
                                        component="a"
                                        href="#"
                                        variant="caption"
                                        color="secondary"
                                        fontWeight="medium"
                                        onClick={() => onEditTrip(trip)}
                                        sx={{ ml: 1 }}
                                    >
                                        Edit
                                    </ArgonTypography>
                                </ArgonBox>
                            ),
                        })
                    })}
                />
            </ArgonBox>
            <ArgonBox display="flex" justifyContent="center" alignItems="center" p={3}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} siblingCount={0} boundaryCount={2} />
            </ArgonBox>

            <TripFormModal
                trip={selectedTrip}
                open={openEdit}
                handleClose={onCloseEdit}
                refresh={refresh}
                mode={modalMode}
            />
        </>
    )
}

export default TripTable