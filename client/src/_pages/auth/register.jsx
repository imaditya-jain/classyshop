import { RegisterForm } from "@/_components"

const AuthRegister = () => {
    return (
        <>
            <div className="flex flex-col gap-6">
                <h2 className="text-center text-[20px] md:text-[24px]  uppercase">Create New Account</h2>
                <RegisterForm />
            </div>
        </>
    )
}

export default AuthRegister