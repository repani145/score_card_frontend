import AdminLayout from "../side_bar/side_bar"
import ChildDashboard from "./child_dashboard"


const Dashboard = ()=>{
    return(
        <>
            <AdminLayout>
                <ChildDashboard/>
            </AdminLayout>
        </>
    )
}
export default Dashboard