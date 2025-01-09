import { useState } from "react"
import { RiMenu2Line } from "react-icons/ri"
import CategoryDrawer from "../_drawers/category.drawer"

const StickyCategoryButton = () => {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    }
    return (
        <>
            <button onClick={() => setOpen(true)} className="bg-[#ff5252] flex md:hidden fixed top-52 left-0 w-[50px] h-[50px] items-center justify-center rounded-r-[5px]"><RiMenu2Line className="text-white text-[20px]" /></button>
            <CategoryDrawer open={open} toggleDrawer={toggleDrawer} />
        </>
    )
}

export default StickyCategoryButton