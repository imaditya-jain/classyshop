import InputFields from "../_fields/input.fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "../_buttons/primary.button";
import { useDispatch, useSelector } from "react-redux";
import { handleResetPassword } from "@/_redux/actions/auth.actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearState } from "@/_redux/slices/auth.slices";

const schema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required.")
        .length(6, "Please enter a valid 6-digit OTP."),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minimum 8 characters are required")
        .max(12, "Maximum 12 characters are allowed")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/\d/, "Password must have at least one number")
        .matches(/[@$!%*?&]/, "Password must have at least one special character"),
});

const ResetPasswordForm = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message, error, user } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const fields = [
        {
            name: "otp",
            type: "text",
            label: "OTP",
            placeholder: "123456",
        },
        {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "",
        },
    ];

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            navigate("/auth/forgot-password");
        }
    }, [navigate]);

    const handleOTPVerification = (data) => {
        const newData = { ...data, email };
        dispatch(handleResetPassword(newData));
    };

    useEffect(() => {
        if (message) {
            toast.dismiss()
            if (error) {
                toast.error(message);
                dispatch(clearState())
            } else {
                toast.success(message);
                dispatch(clearState())
                setTimeout(() => {
                    sessionStorage.removeItem("email");
                }, 1000);

                navigate('/auth/login')
            }
            reset();
        }
    }, [message, error, reset, user, navigate, dispatch]);

    return (
        <form onSubmit={handleSubmit(handleOTPVerification)}>
            {fields.map((field, index) => (
                <InputFields
                    key={`reg-form-field-${index}`}
                    name={field.name}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    register={register}
                    errors={errors}
                />
            ))}
            <PrimaryButton type="submit" title="Reset Password" fullWidth={true} />
        </form>
    );
};

export default ResetPasswordForm;
