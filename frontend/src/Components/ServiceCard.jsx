import React from 'react';
import styled from 'styled-components';

const ServiceCard = ({ icon, title, hindiTitle, ctaText, onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <div className="card">
        <div className="icon-wrap">{icon}</div>
        <p className="title">{title}</p>
        <p className="subtitle">{hindiTitle}</p>
        <button className="btn">{ctaText}</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;

  .card {
    background: #ffffff;
    border: 0.5px solid #e0ddf5;
    border-radius: 12px;
    padding: 18px 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    transition: background 0.2s ease, border-color 0.2s ease,
      transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    background: #eae6fb;
    border-color: #afa9ec;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(127, 119, 221, 0.15);
  }

  .icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #f5f5f5;
    border: 0.5px solid #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
    font-size: 22px;
    color: #534ab7;
    transition: background 0.2s ease;
  }

  .card:hover .icon-wrap {
    background: #ffffff;
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
  }

  .subtitle {
    font-size: 11.5px;
    color: #666;
    margin: 0 0 6px;
  }

  .btn {
    width: 100%;
    padding: 9px 0;
    border-radius: 8px;
    border: none;
    background: #6c3fc5;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    margin-top: auto;
    transition: background 0.2s ease;
  }

  .btn:hover {
    background: #5430a8;
  }
`;

export default ServiceCard;