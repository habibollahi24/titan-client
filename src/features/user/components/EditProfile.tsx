import { FormEvent, useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import callApi from "../../../services/callApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getUser } from "./MainCart";

export const updateUser = async (data: any) => {
  const response = await callApi().put("/users/update", data);
  return response;
};

function EditProfile() {
  const textRef = useRef<HTMLInputElement>(null);
  const { data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
  const user = data?.data.user;

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [profession, setProfession] = useState(user?.profession);
  const [profileUrl, setProfileUrl] = useState("");
  //
  const [image, setImage] = useState<any>(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      refetch();
      toast.success("update successfully");
      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.msg);
      }
    },
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    await mutateAsync({
      firstName,
      lastName,
      profession,
      location,
      profileUrl,
    });
  };

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );
      const res = await response.json();
      setUrl(res.public_id);
      setProfileUrl(
        "http://res.cloudinary.com/dpp5z9hh6/image/upload/v1/" + res.public_id,
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeFile = (event: any) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  useEffect(() => {
    textRef.current?.focus();
  }, []);

  return (
    <div className="text-center">
      <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form
            onSubmit={submitHandler}
            className="mb-0  space-y-4 rounded-lg bg-gray-100 p-4 shadow-sm  dark:bg-secondary-900 sm:p-6 lg:p-8"
          >
            <h1 className="mb-6 text-center text-2xl font-bold text-secondary-700 dark:text-secondary-400  ">
              Edit Your Profile
            </h1>
            <div>
              <input
                ref={textRef}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                className="form-input w-full rounded-md border-none bg-secondary-200 p-3  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
                placeholder="Enter Firstname"
              />
            </div>
            <div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input w-full rounded-md border-none bg-secondary-200 p-3  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
                placeholder="Enter LastName"
              />
            </div>
            <div>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="form-input w-full rounded-md border-none bg-secondary-200 p-3  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
                placeholder="Enter Profession"
              />
            </div>
            <div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input w-full rounded-md border-none bg-secondary-200 p-3  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
                placeholder="Enter Location"
              />
            </div>
            <div className="w-full text-center">
              <label
                className=" flex w-full cursor-pointer justify-center rounded-md bg-secondary-200 p-3"
                htmlFor="inputFile"
              >
                <FaCamera className="text-xl text-secondary-600" />
                <input
                  type="file"
                  onChange={onChangeFile}
                  accept="image/*"
                  id="inputFile"
                  className="form-input hidden w-full rounded-md border-none bg-secondary-200 p-3  placeholder:text-xs focus:border-none focus:outline-none  focus:outline-primary-600 focus:ring-0"
                  placeholder="Enter Location"
                />
              </label>
            </div>
            {image && (
              <div className="flex items-center justify-center space-x-5">
                <div className=" h-20 w-20 overflow-hidden rounded-md">
                  {preview && (
                    <img src={preview} alt="preview" className="w-full" />
                  )}
                </div>
                <button
                  disabled={!image}
                  className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={uploadImage}
                  type="button"
                >
                  upload image
                </button>
              </div>
            )}
            {loading && (
              <div className="flex items-center justify-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary-800 border-t-transparent"></div>
                <span>Processing...</span>
              </div>
            )}
            {url && <p className="text-success">Upload Success</p>}

            <button type="submit" className="btn btn-primary  block w-full">
              OK
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
