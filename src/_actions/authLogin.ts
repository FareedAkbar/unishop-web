"use server";

import { cookies } from 'next/headers';
import type { VerifyOTP } from '~/types/login';
import type { VerifyOTPResponse } from '~/types/loginResponse';
import type UserType from '~/types/userType';
import { apiRouter } from '~/utils/api-router';


export async function VerifyOTPCApi(payload: VerifyOTP): Promise<VerifyOTPResponse | boolean> {

    try {
        const response = await apiRouter(
            "VERIFYOTP",
            {
                method: "POST",
                body: JSON.stringify(payload),
            },
            { skipAuthorization: true },
        );

        const responsePayload: { status: boolean; data: UserType, message: string, token: string } =
            (await response.json()) as VerifyOTPResponse;

        // Check if result has the expected structure
        if (response?.status) {
            cookies().set({
                name: 'IS_LOGGED_IN',
                value: 'true',
                httpOnly: true,
                path: '/',
            })
            return responsePayload
        } else {
            console.error("Unexpected result structure:", responsePayload);
            return responsePayload
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return false
    }
};




