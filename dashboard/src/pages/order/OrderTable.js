import Table from "examples/Tables/Table";
import ArgonBox from "components/ArgonBox";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import ArgonBadge from "components/ArgonBadge";
import ArgonTypography from "components/ArgonTypography";
import { getOrders } from "services/order";

const tableData = {
    columns: [
        { name: "order_id", align: "center" },
        { name: "customer", align: "center" },
        { name: "start_at", align: "center" },
        { name: "end_at", align: "center" },
        { name: 'price', align: 'center' },
        { name: "status", align: "center" },
    ],
};

const OrderTable = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const { columns } = tableData;
    const [orders, setOrders] = useState([])

    const refresh = async () => {
        const data = await getOrders(currentPage - 1)
        if (!data) return;

        setOrders(data.content)
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

    return (
        <>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Orders table</ArgonTypography>
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
                    rows={orders.map((order) => {
                        return ({
                            order_id: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {order.order.orderId}
                                </ArgonTypography>
                            ),
                            customer: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {order.order.user.fullName}
                                </ArgonTypography>
                            ),
                            start_at: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {order.ticket.addressStart}
                                </ArgonTypography>
                            ),
                            end_at: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {order.ticket.addressEnd}
                                </ArgonTypography>
                            ),
                            price: (
                                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                                    {Intl.NumberFormat().format(order.ticket.price)} đ
                                </ArgonTypography>
                            ),
                            status: (
                                <ArgonBadge
                                    variant="gradient"
                                    badgeContent={order.status ? "Booked" : "Pending"}
                                    color={order.status ? "success" : "secondary"}
                                    size="xs"
                                    container
                                />
                            )
                        })
                    })}
                />
            </ArgonBox>
            <ArgonBox display="flex" justifyContent="center" alignItems="center" p={3}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} siblingCount={0} boundaryCount={2} />
            </ArgonBox>

            {/* <OrderFormModal
                trip={selectedOrder}
                open={openEdit}
                handleClose={onCloseEdit}
                refresh={refresh}
                mode={modalMode}
            /> */}
        </>
    )
}

export default OrderTable