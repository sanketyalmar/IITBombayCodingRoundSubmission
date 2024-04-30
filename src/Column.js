import React from "react";

const Column = ({
  column,
  cards,
  onDragOver,
  onDrop,
  handleDragStart,
  handleCardClick,
}) => {
  return (
    <div className="column" onDragOver={onDragOver} onDrop={onDrop}>
      <h1>{column}</h1>
      {cards.map((card) => (
        <div
          key={card.id}
          className="card"
          draggable
          onDragStart={(e) => handleDragStart(e, card.id)}
          onClick={() =>
            handleCardClick(card.id, card.title, card.description, column)
          }
        >
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Column;
