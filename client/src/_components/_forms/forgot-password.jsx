import InputFields from "../_fields/input.fields";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PrimaryButton from "../_buttons/primary.button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleForgotPassword } from "@/_redux/actions/auth.actions";
import { clearState } from "@/_redux/slices/auth.slices";

const schema = yup.object().shape({
    email: yup.string().required('Email is required.').email('Invalid email.')
});

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { message, error } = useSelector((state) => state.auth);

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
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "john@example.com",
        },
    ];


    const ForgotPassword = (data) => {
        dispatch(handleForgotPassword(data));
        sessionStorage.setItem("email", data.email);
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
                    navigate("/auth/reset-password");
                }, 1000);
            }
        }
        reset();
    }, [error, message, dispatch, navigate, reset]);

    return (
        <form onSubmit={handleSubmit(ForgotPassword)}>
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
            <PrimaryButton type="submit" title="Request Reset" fullWidth={true} />
        </form>
    );
};

export default ForgotPasswordForm;
