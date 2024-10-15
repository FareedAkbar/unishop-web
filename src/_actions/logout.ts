"use server";

import { cookies } from 'next/headers';



export async function LogOutApi() {

    try {
        cookies().delete("IS_LOGGED_IN")

    } catch (error) {
        console.error("Error fetching data:", error);

    }
};




