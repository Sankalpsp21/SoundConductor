import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse p-48">
          <div className="text-center lg:text-left m-12">
            <h1 className="text-5xl font-bold">Begin Your Journey with SoundConductor</h1>
            <p className="py-6">Put instructions here</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Token</span>
                </label>
                <input type="text" placeholder="Enter Your Token Here" className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary"
                  onClick={() => {
                    navigate('/home')
                  }}
                >Enter SoundConductor</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
