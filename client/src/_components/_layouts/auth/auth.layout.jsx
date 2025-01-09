import { Container, Grid2 } from "@mui/material"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <>
            <section>
                <Container maxWidth="xl" className="px-4 md:!px-0">
                    <Grid2 container justifyContent="center">
                        <Grid2 size={{ xs: 12, md: 11 }}>
                            <div className="flex items-center justify-center flex-col" style={{ height: "100vh" }}>
                                <div>
                                    <h1 className="uppercase text-center font-[600] text-[23px] md:text-[32px]">Welcome To ClassyShop</h1>
                                    <div className="max-w-[30rem] w-full bg-white p-6 rounded-lg mt-6">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </Grid2>
                    </Grid2>
                </Container>
            </section>
        </>
    )
}

export default AuthLayout