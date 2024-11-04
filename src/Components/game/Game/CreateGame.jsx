import React, { useState } from "react";
import { FaArrowLeft, FaCheck, FaFilter } from "react-icons/fa";
import { IoGameControllerSharp, IoOptionsOutline } from "react-icons/io5";
import "./Games.css";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../../assets/download (3).png";
import { AiFillThunderbolt } from "react-icons/ai";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdRemoveCircle } from "react-icons/io";
function CreateGame() {
  const navigate = useNavigate();
  const [numberOfPlayers, setNumberOfPlayers] = useState("4");
  const [options, setoptions] = useState({
    start: false,
    switch: false,
    moreOptions: true,
  });

  const playerCard = [
    {
      background: "#FF5733",
      name: "Player One",
      style: "Bronze",
      games: { totalgames: 5, stats: 3 },
    },
    {
      background: "#33FF57",
      name: "Player Two",
      style: "Silver",
      games: { totalgames: 7, stats: 5 },
    },
    {
      background: "#3357FF",
      name: "Player Three",
      style: "Gold",
      games: { totalgames: 10, stats: 8 },
    },
    {
      background: "#FF33A1",
      name: "Player Four",
      style: "Platinum",
      games: { totalgames: 4, stats: 2 },
    },
  ];
  console.log(numberOfPlayers);
  return (
    <div className="pt-5 px-3">
      <div className="my-3">
        <button className="back-btn px-2 py-1">
          <FaArrowLeft onClick={() => navigate(-1)} />
        </button>
      </div>

      <h2 className="text-start">
        <span className="main-heading">
          {playerCard?.length} of {numberOfPlayers} players,
        </span>
        <br />
        {playerCard?.length < numberOfPlayers
          ? "Waiting for players..."
          : "Ready to start"}
      </h2>
      <div className="d-flex flex-wrap gap-2 mt-3 align-items-center">
        <button
          class="btn btn-primary px-3 border-0  add-game "
          type="button"
          onClick={() =>
            setoptions({
              ...options,
              start: !options.start,
            })
          }
          disabled={options.start}
        >
          Set Ready
          <FaCheck className="ms-2" />
        </button>
        {/* <button
          class="btn btn-info bg-transparent px-3 "
          type="button"
          onClick={() =>
            setoptions({
              ...options,
              moreOptions: !options.moreOptions,
            })
          }
        >
          Options
          <IoOptionsOutline className="ms-2" size={15} />
        </button> */}
        <div class="form-check form-switch custom-switch">
          <input
            class="form-check-input mt-0"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked={options.switch}
            onClick={() =>
              setoptions({
                ...options,
                switch: !options.switch,
              })
            }
          />
          <label className="ms-1">
            {options.switch ? "Public" : "Private"}
          </label>
        </div>
        {/* <button class="btn btn-info bg-transparent" type="button">
          <IoReloadOutline />
        </button> */}
      </div>
      {/* {options.moreOptions && ( */}
      <div
        className={`w-100 mt-4 ${
          options.moreOptions ? "animated-div-enter" : "animated-div-exit"
        } animated-div`}
      >
        <div className="card border-0 curtom-card ">
          <div className="card-body p-lg-5 px-lg-4">
            <div className="row">
              <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label for="select" class="form-label">
                  Style
                </label>
                <select id="Select" class="form-select custom-select">
                  <option className="custom-option">All-five</option>
                  <option className="custom-option">All-Threes</option>
                  <option className="custom-option">Draw</option>
                  <option className="custom-option">Block</option>
                </select>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label for="select" class="form-label">
                  Players
                </label>
                <select
                  id="Select"
                  class="form-select custom-select"
                  value={numberOfPlayers}
                  onChange={(e) => setNumberOfPlayers(e.target.value)}
                >
                  <option className="custom-option" value={2}>
                    2
                  </option>
                  <option className="custom-option" value={4}>
                    4
                  </option>
                </select>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
                <label for="select" class="form-label">
                  Entry
                </label>
                <select id="Select" class="form-select custom-select">
                  <option className="custom-option">100</option>
                  <option className="custom-option">200</option>
                  <option className="custom-option">250</option>
                  <option className="custom-option">300</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
      <h2 className="text-start my-4">Players</h2>
      <div className="row g-4 pb-4">
        {playerCard?.map((card, index) => (
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="" key={index}>
              <div className="card border-0 curtom-card ">
                <div className="card-body p-lg-5 px-lg-4">
                  <div className="d-flex justify-content-between">
                    <div
                      className="avatar-img-container rounded-3"
                      style={{ backgroundColor: card?.background }}
                    >
                      <img
                        key={index}
                        className={`rounded-circle avatar-img `}
                        src={avatarImg}
                      />
                    </div>
                    <DropdownButton
                      className="dropdown-custom"
                      id="dropdown-basic-Info"
                      variant={"info"}
                      title={<HiOutlineDotsVertical />}
                    >
                      <Dropdown.Item>
                        <IoMdRemoveCircle className="me-2" />
                        Kick
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="mt-2">
                    <p className="card-title mb-0">{card?.name}</p>
                    <p className="card-text mb-0">{card.style}</p>
                  </div>
                  <div className="d-flex mt-4  align-items-center">
                    <span
                      //   key={badgeIndex}
                      className={`badge custom-badge `}
                    >
                      <AiFillThunderbolt className="me-1" />{" "}
                      {card?.games?.totalgames}
                    </span>
                    <span
                      //   key={badgeIndex}
                      className={`badge custom-badge-2 ms-2`}
                    >
                      <IoGameControllerSharp className="me-1" />{" "}
                      {card?.games?.totalgames}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateGame;
