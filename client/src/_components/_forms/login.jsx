import InputFields from "../_fields/input.fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "../_buttons/primary.button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/_redux/actions/auth.actions";
import { clearState } from "@/_redux/slices/auth.slices";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
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

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, error } = useSelector((state) => state.auth);

    const { register, handleSubmit, formState: { errors }, reset, } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const fields = [
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "Enter email",
        },
        {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "Enter password",
        },
    ];

    const handleLogin = (data) => {
        dispatch(loginUser(data));
        sessionStorage.setItem("email", data.email);
    };

    useEffect(() => {
        if (message) {
            if (error) {
                toast.error(message);
            } else {
                toast.success(message);
                setTimeout(() => {
                    dispatch(clearState());
                    navigate("/auth/verify-otp");
                }, 1000);
            }
        }
        reset();
    }, [error, message, dispatch, navigate, reset]);

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
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
                <PrimaryButton type="submit" title="Login" fullWidth={true} />
            </form>
            <div className="flex flex-col md:flex-row md:justify-between items-center">
                <p className="font-[500] text-[14px]">
                    Create a new account.{" "}
                    <Link to="/auth/register" className="text-[#ff5252]">
                        Sign Up
                    </Link>
                </p>
                <p className="font-[500] text-[14px]">
                    <Link to="/auth/forgot-password" className="text-[#ff5252]">
                        Forgot Password
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
