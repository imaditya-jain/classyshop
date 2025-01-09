import InputFields from "../_fields/input.fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "../_buttons/primary.button";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "@/_redux/actions/auth.actions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearState } from "@/_redux/slices/auth.slices";

const schema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required.")
        .length(6, "Please enter a valid 6-digit OTP."),
});

const VerifyOTPForm = () => {
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
    ];

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            setEmail(storedEmail);
        } else {
            navigate("/auth/login");
        }
    }, [navigate]);

    const handleOTPVerification = (data) => {
        const newData = { ...data, email };
        dispatch(verifyOTP(newData));
    };

    useEffect(() => {
        if (message) {
            toast.dismiss()
            if (error) {
                toast.error(message);
                dispatch(clearState)
            } else {
                toast.success(message);
                dispatch(clearState())
                setTimeout(() => {
                    if (user) {
                        navigate(user.role === "user" ? "/" : "/admin/dashboard");
                    }
                }, 500)
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
            <PrimaryButton type="submit" title="Verify & Sign In" fullWidth={true} />
        </form>
    );
};

export default VerifyOTPForm;
