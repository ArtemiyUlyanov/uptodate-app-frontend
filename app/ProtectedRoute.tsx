import { useAccount } from "@/hooks/models/useAccount";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export type ProtectedRouteProps = {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children
}) => {
    const { user, isFetched } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if (isFetched && user == undefined) {
            router.back();
        }
    });

    return user !== undefined ? children : null;
}

export default ProtectedRoute;