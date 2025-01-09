import { Header, StickyCategoryButton } from "@/_components"
import { Outlet } from "react-router-dom"

const ShopLayout = () => {
    return (
        <>
            <Header />
            <StickyCategoryButton />
            <Outlet />
        </>
    )
}

export default ShopLayout