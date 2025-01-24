/* eslint-disable @typescript-eslint/await-thenable */
"use server";

import { cookies } from 'next/headers';

export async function LogOutApi() {
    
    try {
        const cookieStore = await cookies();
        cookieStore.delete('IS_LOGGED_IN');
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
