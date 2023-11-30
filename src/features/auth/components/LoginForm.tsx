import React from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, LoginSchema } from "../validation";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../../../context/AuthProvider";

function LoginForm() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // console.log(data.data.token);
      setToken(data.data.token);
      toast.success("welcome to TechTitans");
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.msg);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
    await mutateAsync(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-[350px]">
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
        type="submit"
        disabled={isPending}
        className="btn btn-primary w-full disabled:bg-secondary-600"
      >
        {isPending ? "loading.." : "Login"}
      </button>
    </form>
  );
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: "email" | "password";
  register: UseFormRegister<LoginSchemaType>;
  error: FieldError | undefined;
}

const InputField = ({ label, type = "text", name, register, error }: Props) => {
  return (
    <div className="relative mb-6 flex flex-col">
      <input
        type={type}
        placeholder={label}
        {...register(name)}
        className=" form-input rounded-md  border-none bg-secondary-100 p-4  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
      />
      {error && (
        <p className="absolute -bottom-5 left-0 text-xs text-error">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default LoginForm;
