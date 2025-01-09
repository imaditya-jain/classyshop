import { Box, Drawer } from "@mui/material"

// eslint-disable-next-line react/prop-types
const MobileMenuDrawer = ({ openMenuDrawer, toggleMenuDrawer }) => {
    return (
        <>
            <Drawer open={openMenuDrawer} onClose={toggleMenuDrawer(false)}>
                <Box sx={{ width: 320 }} role="presentation" onClick={toggleMenuDrawer(false)}>

                </Box>
            </Drawer>
        </>
    )
}

export default MobileMenuDrawer