import { Box, Popover } from "@mui/material"

/* eslint-disable react/prop-types */
const CustomPopover = ({ open, anchorEl, id, handleClose, children }) => {
    return (
        <>
            <Box>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    {children}
                </Popover>
            </Box>
        </>
    )
}

export default CustomPopover