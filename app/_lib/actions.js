"use server"

import { redirect } from "next/dist/server/api-utils";
import { signIn, signOut } from "./auth";

export async function updateGuest() {
    console.log("Server action");
}

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}