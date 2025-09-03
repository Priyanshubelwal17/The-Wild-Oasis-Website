"use server"

import { redirect } from "next/dist/server/api-utils";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";

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

    revalidatePath('/account/profile')

    if (error)

        throw new Error('Guest could not be updated');


    // No error here! We handle the possibility of no guest in the sign in callback
    return data;
}

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}