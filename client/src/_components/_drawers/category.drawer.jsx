import { Close } from "@mui/icons-material"
import { Box, Drawer, IconButton } from "@mui/material"

// eslint-disable-next-line react/prop-types
const CategoryDrawer = ({ open, toggleDrawer }) => {
    return (
        <>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 320 }} role="presentation" onClick={toggleDrawer(false)}>
                    <Box py={1} px={3} className="flex items-center justify-between border-b-[1px] border-gray-300">
                        <h3 className="font-[500] text-[18px]">Shop By Categories</h3>
                        <IconButton onClick={toggleDrawer(false)}><Close /></IconButton>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default CategoryDrawer