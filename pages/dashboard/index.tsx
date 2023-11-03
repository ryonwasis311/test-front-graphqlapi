import MainLayout from "../../layouts/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import Dashboard1 from "../../components/Dashboard1";
import { ButtonGroupUsers } from "../../contents/Post/ButtonGroupUsers";
import { userService } from "../../services";
import { useEffect } from "react";
const Dashboard = () => {
    useEffect(() => {
        const getAllUsers = async () => {
            const userData: any = await userService.getAll();

            console.log(userData, "userData");
            return userData;
        }
        getAllUsers();

    },[])

    return (
        <div className="lg:flex-row lg:justify-center items-center flex flex-col relative w-full h-full lg:overflow-hidden">
            <div className="lg:w-[20%] md:w-[30%] mt-40 w-0 h-full">
                <ButtonGroupUsers />
            </div>
            <div className="w-[60%]">
                <Dashboard1 />
            </div>
        </div>
    );
};

Dashboard.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};
export default Dashboard;
