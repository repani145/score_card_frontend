import Navbar from "./nav";

const LandingPage = () => {
    return (
       <> 
       <Navbar/>
       <br/><br/><br/><br/><br/>
       <div className="landing-container d-flex flex-column align-items-center justify-content-end vh-75 text-center pb-5">
      <h1 className="display-1 fw-bold">Symplotel Score Card</h1>
    </div>
      </>
    );
  };
  
  export default LandingPage;