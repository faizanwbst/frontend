import React from "react";
import { FaFilter } from "react-icons/fa";
import { IoGameControllerSharp, IoReloadOutline } from "react-icons/io5";
import "./Games.css";
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function Games() {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Game Room 1",
      status: "Ready to start!",
      badges: ["Primary", "Secondary"],
      background: "#FF5733",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/9.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/23.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/8.webp",
      ],
    },
    {
      title: "Game Room 2",
      status: "Waiting for players...",
      badges: ["Success", "Info"],
      background: "#33FF57",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        "https://cdn4.iconfinder.com/data/icons/bonus-1/256/Ui_glyphs2_hourglass-512.png",
      ],
    },
    {
      title: "Game Room 2",
      status: "Ready to start!",
      badges: ["Success", "Info"],
      background: "#3357FF",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/5.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/3.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/21.webp",
      ],
    },
    {
      title: "Game Room 2",
      status: "Ready to start!",
      badges: ["Success", "Info"],
      background: "#FF33A4",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/3.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/4.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/5.webp",
      ],
    },
    {
      title: "Game Room 5",
      status: "Waiting for players...",
      badges: ["Primary", "Secondary"],
      background: "#FF#3A1",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/9.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/23.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
        "https://cdn4.iconfinder.com/data/icons/bonus-1/256/Ui_glyphs2_hourglass-512.png",
      ],
    },
    {
      title: "Game Room 6",
      status: "Waiting for players...",
      badges: ["Primary", "Secondary"],
      background: "#AA43A1",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/9.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/23.webp",
        "https://cdn4.iconfinder.com/data/icons/bonus-1/256/Ui_glyphs2_hourglass-512.png",
        "https://cdn4.iconfinder.com/data/icons/bonus-1/256/Ui_glyphs2_hourglass-512.png",
      ],
    },
    {
      title: "Game Room 7",
      status: "Waiting for players...",
      badges: ["Primary", "Secondary"],
      background: "#FD3FA1",
      avatars: [
        "https://mdbcdn.b-cdn.net/img/new/avatars/9.webp",
        "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
        "https://cdn4.iconfinder.com/data/icons/bonus-1/256/Ui_glyphs2_hourglass-512.png",
        "https://cdn4.iconfinder.com/data/icons/bonus-1/256/Ui_glyphs2_hourglass-512.png",
      ],
    },
  ];

  return (
    <div className="pt-5 px-3">
      <h2 className="text-start">
        <span className="main-heading"> Hey there,</span>
        <br /> Let's play Dominos.
      </h2>
      <div className="d-flex flex-wrap gap-2 mt-3">
        <button
          class="btn btn-primary px-3 border-0  add-game "
          type="button"
          onClick={() => navigate("/create-game")}
        >
          New Game
          <IoGameControllerSharp className="ms-2" />
        </button>
        <button class="btn btn-info bg-transparent px-3 " type="button">
          FIlter
          <FaFilter className="ms-2" size={15} />
        </button>
        <button class="btn btn-info bg-transparent" type="button">
          <IoReloadOutline />
        </button>
      </div>
      <div className="row pt-2 pb-4">
        {cardData.map((card, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="mt-4" key={index}>
              <div
                className="card border-0 curtom-card"
                onClick={() => navigate("/game", { state: { avatarCount: card } })}
                >
                <div className="card-body p-lg-5 px-lg-4">
                  <p className="card-title mb-0 fw-bold">{card.title}</p>
                  <p className="card-text mb-1">{card.status}</p>
                  {card.badges.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`badge custom-badge ${
                        badgeIndex > 0 && "ms-1"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}

                  <div className="d-flex mt-5 justify-content-between align-items-center">
                    <div className="d-flex">
                      {card.avatars.map((avatar, avatarIndex) => (
                        <img
                          key={avatarIndex}
                          className={`rounded-circle user-img ${
                            avatarIndex > 0 && "ms-2"
                          }`}
                          alt={`avatar${avatarIndex + 1}`}
                          src={avatar}
                        />
                      ))}
                    </div>
                    <div className="me-1">
                      <FaCirclePlay size={20} />
                    </div>
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

export default Games;
