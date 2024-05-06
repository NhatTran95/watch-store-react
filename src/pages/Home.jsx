import Products from "../components/Products/Products";
import Sidebar from "../components/Sidebar/Sidebar";
import MainLayout from "../layout/MainLayout";

export default function Home() {
    return (
        <MainLayout>
            <div className="container">
                <img src="src/assets/home.jpg" style={{ width: "100%" }} />
            </div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-lg-2 col-md-4 com-sm-12">
                        <Sidebar/>
                    </div>
                    <div className="col-lg-10 col-md-8 col-sm-12">
                        <Products/>
                    </div>

                </div>

            </div>
        </MainLayout>
    )
}