import { VerifyOTPForm } from "@/_components"

const AuthVerifyOTP = () => {
    return (
        <>
            <div className="flex flex-col gap-6">
                <h2 className="text-center text-[20px] md:text-[24px]  uppercase">Verify & Sign In</h2>
                <VerifyOTPForm />
            </div>
        </>
    )
}

export default AuthVerifyOTP