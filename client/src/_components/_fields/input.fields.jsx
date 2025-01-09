import { IconButton, TextField } from "@mui/material"
import { useState } from "react"
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

/* eslint-disable react/prop-types */
const InputFields = ({ label, name, register, errors, type, placeholder }) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className="mb-4 relative">
                <TextField
                    variant="outlined"
                    type={type === "password" && show ? 'text' : type === "password" && !show ? 'password' : type}
                    name={name}
                    label={label}
                    placeholder={placeholder}
                    fullWidth
                    {...register(name)}
                    error={!!errors[name]}
                    helperText={errors[name] && errors[name]?.message}
                />
                {
                    type === "password" && <IconButton className="!absolute right-0 top-2" onClick={() => setShow(!show)}>{show ? <IoMdEyeOff /> : <IoMdEye />}</IconButton>
                }
            </div>
        </>
    )
}

export default InputFields