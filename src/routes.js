import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard"
import SignUp from "./components/signup"
import LandingPage from "./components/landing_page";
import { useAuth } from "./customHooks/user_auth";
import Login from "./components/login";
import ExportImport from "./side_bar/export_import";
import AddData from "./side_bar/add_data";
import EmployeeTable from "./side_bar/add_data";
import AddEmployeeDataFromFile from "./side_bar/add_data_from_file";


const RoutingComponent = () => {
    const { user, accessToken } = useAuth();
    return (
        <>
            <>
                <Routes>
                    {accessToken ?
                        <>
                            
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                            <Route path="/export_import" element={<ExportImport />}></Route>
                            <Route path="/employees_data" element={<EmployeeTable />}></Route>
                            <Route path="/employees_data_from_file" element={<AddEmployeeDataFromFile/>}></Route>
                        </>
                        :
                        <>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/signup" element={<SignUp />}></Route>
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </>
                    }
                </Routes>
            </>
        </>
    )
}

export default RoutingComponent;