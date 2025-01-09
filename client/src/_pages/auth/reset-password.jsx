import { ResetPasswordForm } from "@/_components"

const AuthResetPassword = () => {
    return (
        <>
            <div className="flex flex-col gap-6">
                <h2 className="text-center text-[20px] md:text-[24px]  uppercase">Reset Password</h2>
                <ResetPasswordForm />
            </div>
        </>
    )
}

export default AuthResetPassword