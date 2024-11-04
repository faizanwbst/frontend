import React, { useState } from "react";
import "./signup.css";
import DominoImage from "../../assets/6845729-removebg-preview.png";

const SignUp = ({ sendData }) => {
  const [inputValue, setInputValue] = useState("");

  const signUp = () => {
    const data = new URLSearchParams();
    data.append("username", inputValue);

    fetch("/signup", {
      method: "post",
      body: data,
    })
      .then((res) => {
        if (res.status === 200) {
          sendData(inputValue);
        } else {
          return res.json();
        }
      })
      .then((jsonData) => {
        if (jsonData) {
          alert(jsonData.error);
        }
      });
  };

  return (
    <div className="signup-container px-lg-0 px-2">
      <div className="py-3 h-100 overflow-auto sign-up-page">
        {/* <div className="h-100"> */}
        <div className="card rounded-3 text-black border-0 h-100 overflow-hidden">
          <div className="row g-0 h-100">
            <div className="d-none d-lg-block col-lg-6 d-flex align-items-center justify-content-center gradient-custom-2">
              <div className=" text-white h-100 d-flex align-items-center justify-content-center  ">
                <img
                  src={DominoImage}
                  style={{ width: "185px" }}
                  className="img-fluid"
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card-body p-md-4 h-100 d-flex align-items-center justify-content-center flex-column">
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center">
                    <img
                      src={DominoImage}
                      style={{ width: "150px" }}
                      className="img-fluid"
                      alt="logo"
                    />
                  </div>
                  <h4 className="">Dominoes</h4>
                </div>
                <form className="w-100">
                  {/* <pPlease login to your account</p> */}
                  <div className="form-outline mb-4 w-100">
                    <label className="form-label" htmlFor="form2Example11">
                      User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Name"
                      value={inputValue}
                      onChange={(evt) => setInputValue(evt.target.value)}
                    />
                  </div>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <button
                      className="btn btn-primary btn-block fa-lg custom-btn border-0 w-100 h-30"
                      type="button"
                      onClick={signUp}
                    >
                      Log in
                    </button>
                  </div>
                  {/* <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SignUp;
