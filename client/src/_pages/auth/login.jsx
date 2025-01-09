import { LoginForm } from "@/_components"

const AuthLogin = () => {
    return (
        <>
            <div className="flex flex-col gap-6">
                <h2 className="text-center text-[20px] md:text-[24px]  uppercase">Sign In</h2>
                <LoginForm />
            </div>
        </>
    )
}

export default AuthLogin