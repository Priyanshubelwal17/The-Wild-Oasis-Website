"use server"

import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";

export async function updateGuest(formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in ")
    const nationalID = formData.get("nationalID")
    const [nationality, countryFlag] = formData.get("nationality").split('%');

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid nation ID")

    const updateData = { nationality, countryFlag, nationalID };


    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)


    if (error)

        throw new Error('Guest could not be updated');


    // No error here! We handle the possibility of no guest in the sign in callback
    return data;


    revalidatePath('/account/profile')
}

export async function deleteReservation(bookingId) {
    const session = await auth();
    if (!session) throw new Error("You must be logged in")

    const guestBookings = await getBookings(session.user.guestId)
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingsIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking")

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error)

        throw new Error('You are not allowed to delete this booking');

    revalidatePath('/account/reservations')
}

export async function updateBooking(formData) {
    const bookingId = Number(formData.get('bookingId'));
    // 1) Authentication
    const session = await auth();
    if (!session) throw new Error("You must be logged in")
    // 2) Authorization

    const guestBookings = await getBookings(session.user.guestId)
    const guestBookingsIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingsIds.includes(bookingId)) throw new Error("You are not allowed to delete this booking")
    // 3) Building update
    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get("observations").slice(0, 100)
    };


    // 4) Mutation
    const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .single()
        .select()

    // 5) Error handling
    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    // 6) Revalidation
    revalidatePath(`/account/reservations/edit/${bookingId}`);

    revalidatePath("/account/reservations")

    // 7) Redirecting

    redirect("/account/reservations")
}
export async function signInAction() {
    await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}