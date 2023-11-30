import { Link } from "react-router-dom";
import RegisterForm from "../features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="items-cente flex flex-col justify-center p-2 duration-300 animate-in zoom-in">
      <h2 className="mb-2 flex items-end justify-start  space-x-1">
        {/* <img src="/favicon.ico" alt="logo" width={25} /> */}
        <span className="text-4xl font-black text-secondary-700 dark:text-secondary-400">
          TechTitans Media
        </span>
      </h2>
      <p className="text-base text-secondary-600 dark:text-secondary-500">
        Create a new account
      </p>
      <RegisterForm />
      <p className="mt-3 text-sm dark:text-secondary-400 ">
        already have an account?{" "}
        <Link to="/login" className="text-light-3 font-bold">
          login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
