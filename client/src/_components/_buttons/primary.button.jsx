import { Button } from '@mui/material'

/* eslint-disable  */
const PrimaryButton = ({ title, type, fullWidth }) => {
    return (
        <>
            <Button type={type} className='!bg-[#ff5252] !py-2 !font-[500] !text-[15px]' variant='contained' fullWidth={fullWidth}>
                {title}
            </Button>
        </>
    )
}

export default PrimaryButton