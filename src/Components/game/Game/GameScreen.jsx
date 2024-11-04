import React from "react";
import "./Games.css";
import { FaArrowLeft } from "react-icons/fa";
import avatarImg from "../../../assets/download (3).png";
import domino1 from "../../../assets/domino_white_2.jpg";
import domino2 from "../../../assets/domino_white_3.jpg";
import domino3 from "../../../assets/domino_white_4.jpg";
import domino4 from "../../../assets/domino_white_5.jpg";

import domino5 from "../../../assets/domino_white_6.jpg";

import domino6 from "../../../assets/domino_white_7.jpg";
import domino7 from "../../../assets/domino_white_8.jpg";

import DragDropContainer from "./DragDrop/DragDropContainer";
import { useLocation, useNavigate } from "react-router-dom";

function GameScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { avatarCount } = location?.state;
  console.log(avatarCount);
  const imageUrls = [
    domino1,
    domino2,
    domino3,
    domino4,
    domino5,
    domino6,
    domino7,
  ];

  const cards = [
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 5",
    "Card 6",
    "Card 7",
  ]; // Sample card data

  const handleDragStart = (e, src) => {
    e.dataTransfer.setData("text/plain", src);
  };
  return (
    <div className="pt-5 px-3">
      <div className="main-game-container position-relative">
        <div className="">
          <div className="domino-player-2-deck">
            <div className="d-flex align-items-center justify-content-between p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className="avatar-img-container rounded-3"
                  style={{ backgroundColor: avatarCount?.background }}
                >
                  <img
                    className={`rounded-circle avatar-img`}
                    alt="avatar"
                    src={avatarImg}
                  />
                </div>
                <div className="ms-3 d-flex">
                  {cards.map((card, index) => (
                    <div
                      className="opponent-card card p-2"
                      key={card.length}
                      style={{
                        zIndex: cards.length - index,
                        left: `${-10 * index}px`,
                        // marginLeft: `${-5 * index}px`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="score-container-opponent text-center">
                <h1>65</h1>
                <p>Points</p>
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary game-back-btn mt-5 px-4 py-3"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>
        {avatarCount?.avatars?.length === 4 && (
          <>
            <div className="domino-player-3-deck">
              <div className="d-flex align-items-center justify-content-between p-3 flex-column main-flex">
                <div className="d-flex align-items-center justify-content-between flex-column gap-76">
                  <div
                    className="avatar-img-container rounded-3"
                    style={{ backgroundColor: avatarCount?.background }}
                  >
                    <img
                      className={`rounded-circle avatar-img`}
                      alt="avatar"
                      src={avatarImg}
                    />
                  </div>
                  <div className="mt-3 d-flex rotate-90">
                    {cards.map((card, index) => (
                      <div
                        className="opponent-card card p-2"
                        key={card.length}
                        style={{
                          zIndex: cards.length - index,
                          left: `${-10 * index}px`,
                          // marginLeft: `${-5 * index}px`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="score-container-opponent text-center">
                  <h1>65</h1>
                  <p>Points</p>
                </div>
              </div>
            </div>
            <div className="domino-player-4-deck">
              <div className="d-flex align-items-center justify-content-between p-3 flex-column main-flex">
                <div className="d-flex align-items-center justify-content-between flex-column gap-76">
                  <div
                    className="avatar-img-container rounded-3"
                    style={{ backgroundColor: avatarCount?.background }}
                  >
                    <img
                      className={`rounded-circle avatar-img`}
                      alt="avatar"
                      src={avatarImg}
                    />
                  </div>
                  <div className="mt-3 d-flex rotate-90">
                    {cards.map((card, index) => (
                      <div
                        className="opponent-card card p-2"
                        key={card.length}
                        style={{
                          zIndex: cards.length - index,
                          left: `${-10 * index}px`,
                          // marginLeft: `${-5 * index}px`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="score-container-opponent text-center">
                  <h1>65</h1>
                  <p>Points</p>
                </div>
              </div>
            </div>
          </>
        )}
        <DragDropContainer />
        <div className="domino-main-deck">
          <div className="d-flex align-items-center justify-content-between p-3 w-100">
            <div
              className="avatar-img-container rounded-3"
              style={{ backgroundColor: avatarCount?.background }}
            >
              <img
                className={`rounded-circle avatar-img`}
                src={avatarImg}
                alt="avatar"
              />
            </div>
            <div className="d-flex">
              {imageUrls.map((src, index) => (
                // <div className="my-dominos card">
                <img
                  key={index}
                  src={src}
                  className={`domino-img ${index > 0 && "ms-2"}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, src)}
                  alt="dominos"
                />
                // </div>
              ))}
            </div>
            <div className="score-container-opponent text-center">
              <h1>65</h1>
              <p>Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
