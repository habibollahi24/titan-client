import React from "react";
import {
  FieldError,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterSchemaType } from "../validation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

function RegisterForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(data.data.message);
      navigate("/login");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.error.message);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    await mutateAsync(values);
  };

  return (
    <>
      <form
        className="mt-4 w-[350px]"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <InputField
          label="FirstName"
          register={register}
          name="firstName"
          error={errors.firstName}
        />
        <InputField
          label="LastName"
          register={register}
          name="lastName"
          error={errors.lastName}
        />
        <InputField
          label="Email"
          register={register}
          name="email"
          error={errors.email}
        />
        <InputField
          label="Password"
          register={register}
          name="password"
          type="password"
          error={errors.password}
        />

        <button
          disabled={isPending}
          type="submit"
          className="btn btn-primary w-full disabled:bg-secondary-600"
        >
          {isPending ? "loading.." : "Register"}
        </button>
      </form>
    </>
  );
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: "firstName" | "lastName" | "email" | "password";
  register: UseFormRegister<RegisterSchemaType>;
  error: FieldError | undefined;
}

const InputField = ({ label, type = "text", name, register, error }: Props) => {
  return (
    <div className="relative mb-6 flex flex-col">
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        className="text-light-2 form-input rounded-md  border-none bg-secondary-100 p-4  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
      />
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default RegisterForm;
