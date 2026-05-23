import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { EditProfileFormData, LocationType } from "../types/user/user.profile";

type Props = {
    register: UseFormRegister<EditProfileFormData>;
    errors: FieldErrors<EditProfileFormData>;

    locationRef: React.RefObject<HTMLDivElement | null>;

    showLocations: boolean;

    setShowLocations: (
        value: boolean
    ) => void;

    locationData: LocationType[];

    handleSelectLocation: (
        location: string
    ) => void;
};

export default function EditProfileFields({ register, errors, locationRef, showLocations, setShowLocations, locationData,  handleSelectLocation}: Props) {

    return (

        <div className="space-y-6">

            {/* NAME + USERNAME */}
            <div className="grid md:grid-cols-2 gap-5">

                <div>

                    <label className="text-sm font-medium text-gray-700"> 
                        Name 
                    </label>

                    <input
                        {...register("name", {required: "Name is required", setValueAs: (value : string) => value.trim(), minLength: { value: 2, message: "Name must be minimum 2 letters!" }})}
                        type="text"
                        placeholder="Al Ameen"
                        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    />

                    {errors.name && ( <p className="text-red-500 text-sm mt-1">{errors.name.message} </p>)}

                </div>

                <div>

                    <label className="text-sm font-medium text-gray-700">
                        Username
                    </label>

                    <input
                        {...register("user_name", {required: "Username is required", setValueAs: (value : string) => value.trim(), minLength: { value: 3, message: "Username must be minimum 3 letters!" }})}
                        type="text"
                        placeholder="@alameen"
                        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    />

                    {errors.user_name && (<p className="text-red-500 text-sm mt-1">{errors.user_name.message} </p>)}

                </div>

            </div>

            {/* GENDER + DOB */}

            <div className="grid md:grid-cols-2 gap-5">

                <div>
                    <label className="text-sm font-medium text-gray-700">
                        Gender
                    </label>

                    <select
                        {...register("gender", {required: "Gender is required"})}
                        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    >

                        <option value="">
                            Select Gender
                        </option>

                        <option value="male">
                            Male
                        </option>

                        <option value="female">
                            Female
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                    {errors.gender && (<p className="text-red-500 text-sm mt-1"> {errors.gender.message} </p>)}

                </div>

                <div>

                    <label className="text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>

                    <input
                        type="date" {...register("dob", {required: "DOB is required", validate: (value: string) => {
                                const date = new Date(value);
                                return (date < new Date()) || "DOB must be a valid date in the past";
                            }
                        })}
                        className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                    />

                    {errors.dob && (<p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>)}

                </div>

            </div>

            {/* LOCATION */}

            <div className="relative" ref={locationRef}>

                <label className="text-sm font-medium text-gray-700">
                    Location
                </label>

                <input
                    {...register("location", { setValueAs: (value : string) => value.trim()})}
                    type="text"
                    placeholder="Kochi, Kerala, India"
                    onFocus={() => setShowLocations(true)}
                    className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />

                {showLocations && locationData?.length > 0 && (

                    <div className="absolute z-20 bg-white border rounded-xl shadow-lg mt-2 w-full max-h-60 overflow-y-auto">

                        {locationData.map((item: LocationType) => (

                            <div key={item.place_id}
                                onClick={() => handleSelectLocation(item.display_name)}
                                className="px-4 py-3 hover:bg-purple-50 cursor-pointer text-sm"
                            >
                                {item.display_name}
                            </div>

                        ))}

                    </div>
                )}

            </div>

            {/* BIO HEAD */}
            <div>

                <label className="text-sm font-medium text-gray-700">
                    Bio Heading
                </label>

                <input
                    {...register("bioHead", { setValueAs: (value  : string) => value.trim(), maxLength: { value: 50, message: "Bio heading must be below 50 characters!" }})}
                    type="text"
                    placeholder="Software Engineer"
                    className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                />

                {errors.bioHead && (<p className="text-red-500 text-sm mt-1">{errors.bioHead.message} </p> )}

            </div>

            {/* BIO TEXT */}
            <div>

                <label className="text-sm font-medium text-gray-700">
                    Bio
                </label>

                <textarea
                    {...register("bioText", {setValueAs: (value  : string) => value.trim(), maxLength: {value: 250, message: "Bio must be below 250 characters!" }})}
                    rows={5}
                    placeholder="Tell something about yourself..."
                    className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
                />

                {errors.bioText && (<p className="text-red-500 text-sm mt-1">{errors.bioText.message} </p>)}

            </div>

        </div>
    );
}