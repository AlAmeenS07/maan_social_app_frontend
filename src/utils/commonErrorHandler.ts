import { AxiosError } from "axios";
import toast from "react-hot-toast";


export function commonErrorHandler(error : unknown){
    if(error instanceof AxiosError){
        toast.error(error?.response?.data?.message)
    }
    else{
        toast.error("Something Error")
    }
}