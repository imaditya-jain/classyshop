import { ForgotPasswordForm } from "@/_components"

const AuthForgotPassword = () => {
    return (
        <>
            <div className="flex flex-col gap-6">
                <h2 className="text-center text-[20px] md:text-[24px]  uppercase">Forgot Password</h2>
                <ForgotPasswordForm />
            </div>
        </>
    )
}

export default AuthForgotPassword