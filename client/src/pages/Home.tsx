import { useNavigate } from "react-router-dom"

const Home = () => {
      const navigate = useNavigate()
      return (
            <>

                  <div className="hero min-h-screen bg-base-100">
                        <div className="hero-content text-center">
                              <div className="max-w-md">
                                    <h1 className="text-5xl font-bold my-16">Home Screen</h1>
                                    <button className="btn btn-primary"
                                          onClick={() => {
                                                navigate('/auth')
                                          }}
                                    >Logout</button>
                              </div>
                        </div>
                  </div>

            </>
      )
}

export default Home
