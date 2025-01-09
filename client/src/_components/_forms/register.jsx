import InputFields from "../_fields/input.fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "../_buttons/primary.button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/_redux/actions/auth.actions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { clearState } from "@/_redux/slices/auth.slices";

const schema = yup.object().shape({
    userName: yup.string().required("Username is required"),
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

const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { message, error } = useSelector(state => state.auth)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema), mode: "onBlur", });

    const fields = [
        {
            name: "userName",
            type: "text",
            label: "Username",
            placeholder: "Enter username",
        },
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

    const handleRegistration = (data) => {
        dispatch(registerUser(data))
    };

    useEffect(() => {
        if (message) {
            toast.dismiss()
            if (error) {
                toast.error(message)
                dispatch(clearState())
            } else if (!error) {
                toast.success(message)
                dispatch(clearState())
                setTimeout(() => {
                    navigate("/auth/login");
                }, 1000);
            }
        }
        reset()
    }, [error, message, reset, navigate, dispatch])

    return (<>
        <form onSubmit={handleSubmit(handleRegistration)}>
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
            <PrimaryButton type="submit" title="Register" fullWidth={true} />
        </form>
        <div>
            <p className="text-center font-[500] text-[14px]">Already have an account? <Link to="/auth/login" className="text-[#ff5252]">Log In</Link></p>
        </div>
    </>
    );
};

export default RegisterForm;
