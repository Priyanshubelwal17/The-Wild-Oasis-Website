"use client"

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import DeleteReservation from '@/app/_components/DeleteReservation';
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(bookings, () => { })
    async function handleDelete(bookingId) {
        await deleteReservation(bookingId)
    }
    return (
        <div>
            <ul className="space-y-6">
                {bookings.map((booking) => (
                    <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
                ))}
            </ul>
        </div>
    );
};

export default ReservationList;