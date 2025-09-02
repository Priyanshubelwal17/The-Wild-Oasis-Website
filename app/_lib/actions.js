"use server"

import { redirect } from "next/dist/server/api-utils";
import { signIn } from "./auth";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" })
}