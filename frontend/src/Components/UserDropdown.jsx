import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiSettings, FiLogOut, FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) return null;

  const firstName = user.kyc?.first_name || user.name?.split(" ")[0] || "User";
  const balance = user.wallet?.balance ?? 0;

  return (
    <Wrapper ref={ref}>
      {/* Trigger */}
      <button className="trigger" onClick={() => setOpen(!open)}>
        <div className="avatar">
          {firstName.charAt(0)}
        </div>
        <span>{firstName}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="card">
          {/* User Info */}
          <div className="userBox">
            <div className="avatar big">{firstName.charAt(0)}</div>
            <div>
              <h4>{firstName}</h4>
              <p>₹{balance.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="separator" />

          {/* Menu */}
          <ul className="list">
            <li
              className="element"
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
            >
              <FiUser />
              <p>Profile</p>
            </li>

            <li
              className="element"
              onClick={() => {
                navigate("/wallet");
                setOpen(false);
              }}
            >
              <FiCreditCard />
              <p>Wallet</p>
            </li>

            <li
              className="element"
              onClick={() => {
                navigate("/settings");
                setOpen(false);
              }}
            >
              <FiSettings />
              <p>Settings</p>
            </li>
          </ul>

          <div className="separator" />

          {/* Logout */}
          <ul className="list">
            <li
              className="element delete"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              <FiLogOut />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      )}
    </Wrapper>
  );
};

export default UserDropdown;
const Wrapper = styled.div`
  position: relative;

  .trigger {
    display: flex;
    align-items: center;
    gap: 10px;
    background: #1e1e2f;
    color: white;
    padding: 6px 12px;
    border-radius: 10px;
    cursor: pointer;
    border: none;
  }

  .avatar {
    width: 32px;
    height: 32px;
    background: #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: bold;
  }

  .avatar.big {
    width: 40px;
    height: 40px;
  }

  .card {
    position: absolute;
    right: 0;
    top: 45px;
    width: 220px;
    background: #242832;
    border-radius: 10px;
    padding: 10px 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 100;
  }

  .userBox {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    color: white;
  }

  .userBox h4 {
    margin: 0;
    font-size: 14px;
  }

  .userBox p {
    margin: 0;
    font-size: 12px;
    color: #aaa;
  }

  .separator {
    border-top: 1px solid #3a3f4b;
    margin: 5px 0;
  }

  .list {
    list-style: none;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .element {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 6px;
    color: #bbb;
    cursor: pointer;
    transition: 0.2s;
  }

  .element:hover {
    background: #4f46e5;
    color: white;
  }

  .element.delete:hover {
    background: #dc2626;
  }

  .element svg {
    font-size: 18px;
  }
`;