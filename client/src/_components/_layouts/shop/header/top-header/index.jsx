import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Badge, Box, Grid2, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material"
import { ShoppingCart, CompareOutlined, FavoriteOutlined, Menu, Logout, } from "@mui/icons-material";
import Search from "./Search";
import MobileMenuDrawer from "../../../../_drawers/mobile-menu.drawer"
import { useDispatch, useSelector } from "react-redux";
import { CustomPopover } from "@/_components";
import { handleLogout } from "@/_redux/actions/auth.actions";

const Header = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch()
    const { user, isAuthenticated, message, error } = useSelector((state) => state.auth)
    const [openMenuDrawer, setOpenMenuDrawer] = useState(false)

    const toggleMenuDrawer = (newOpen) => () => {
        setOpenMenuDrawer(newOpen);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'left',
    }

    const handleUserLogout = () => {
        dispatch(handleLogout())
    }

    useEffect(() => {
        if (!user && !isAuthenticated && message && !error) {
            navigate('/auth/login')
        }
    }, [message, navigate, user, isAuthenticated])


    return (
        <>
            <div className="py-3 border-gray-300 border-b-[1px]">
                <Grid2 container justifyContent="center">
                    <Grid2 container spacing={2} size={11} alignItems="center">
                        <Grid2 size={{ xs: 1.5, md: 0 }} className="block md:hidden">
                            <IconButton onClick={() => setOpenMenuDrawer(true)}>
                                <Menu />
                            </IconButton>
                        </Grid2>
                        <Grid2 size={{ xs: 5.5, md: 3 }} order={1}>
                            <Link to="/">
                                <img
                                    src="/assets/images/logo.png"
                                    alt="logo"
                                    className="max-w-full h-auto"
                                />
                            </Link>
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 5 }} order={{ xs: 3, md: 2 }}>
                            <Search />
                        </Grid2>
                        <Grid2 size={{ xs: 5, md: 4 }} order={{ xs: 2, md: 3 }}>
                            <ul className="flex items-center justify-end gap-1 sm:gap-3">
                                <li className="hidden sm:block">
                                    {
                                        !user && !isAuthenticated ? <>
                                            <Link
                                                to="#"
                                                className="link transition text-[15px] font-[500]"
                                            >
                                                Login
                                            </Link>{" "}
                                            |{" "}
                                            <Link
                                                to="#"
                                                className="link transition text-[15px] font-[500]"
                                            >
                                                Register
                                            </Link>
                                        </> : <>
                                            <button aria-describedby={id} onClick={handleClick}>{user && isAuthenticated && user?.userName || user?.email}</button>
                                            <CustomPopover open={open} id={id} anchorEl={anchorEl} handleClose={handleClose} anchorOrigin={anchorOrigin}>
                                                <Box py={1} sx={{ width: 200 }}>
                                                    <List className="!p-0 !m-0">
                                                        <ListItem className="!p-0 !m-0">
                                                            <ListItemButton onClick={handleUserLogout}>
                                                                <ListItemIcon><Logout /></ListItemIcon>
                                                                <ListItemText primary="Log Out" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </List>
                                                </Box>
                                            </CustomPopover>
                                        </>
                                    }
                                </li>
                                <li>
                                    <Tooltip title="Compare">
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={4} color="secondary">
                                                <CompareOutlined className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip title="Wishlist">
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={4} color="secondary">
                                                <FavoriteOutlined className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                                <li>
                                    <Tooltip title="Cart">
                                        <IconButton aria-label="cart">
                                            <Badge badgeContent={4} color="secondary">
                                                <ShoppingCart className="text-[#1f1f1f] !text-[20px] md:!text-[25px]" />
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                </li>
                            </ul>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </div>
            <MobileMenuDrawer openMenuDrawer={openMenuDrawer} toggleMenuDrawer={toggleMenuDrawer} />
        </>
    )
}

export default Header