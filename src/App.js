import React, { useState } from "react";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";
import Modal from "./Modal";

const App = () => {
  const [columns, setColumns] = useState({
    column1: [
      { id: uuidv4(), title: "Card 1", description: "Description for Card 1" },
    ],
    column2: [
      { id: uuidv4(), title: "Card 2", description: "Description for Card 2" },
    ],
    column3: [
      { id: uuidv4(), title: "Card 3", description: "Description for Card 3" },
    ],
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    column: "column1",
  });
  const [formErrors, setFormErrors] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "title") {
      validateTitle(value);
    } else if (name === "description") {
      validateDescription(value);
    }

    if (name === "column" && formData.id) {
      const { id, column } = formData;
      const updatedColumns = { ...columns };
      const cardIndex = updatedColumns[column].findIndex(
        (card) => card.id === id
      );
      if (cardIndex !== -1) {
        updatedColumns[column] = updatedColumns[column].filter(
          (card) => card.id !== id
        );
      }
      updatedColumns[value] = [
        ...updatedColumns[value],
        { id, title: formData.title, description: formData.description },
      ];
      setColumns(updatedColumns);
      newFormData = { id: "", title: "", description: "", column: value };
    }

    setFormData(newFormData);
  };

  const validateTitle = (value) => {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title should only contain alphabets.",
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, title: "" }));
    }
  };

  const validateDescription = (value) => {
    if (value.length < 25) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description should be at least 25 characters.",
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, description: "" }));
    }
  };

  const handleCardClick = (id, title, description, column) => {
    setFormData({ id, title, description, column });
    setShowModal(true);
  };

  const handleAddCard = () => {
    const { id, title, description, column } = formData;
    const columnData = columns[column];
    if (title && description && columnData) {
      if (id) {
        const updatedColumns = { ...columns };
        const cardIndex = updatedColumns[column].findIndex(
          (card) => card.id === id
        );
        if (cardIndex !== -1) {
          updatedColumns[column][cardIndex] = { id, title, description }; // Replace existing card data
        }
        setColumns(updatedColumns);
      } else {
        const newCard = { id: uuidv4(), title, description };
        setColumns((prevColumns) => ({
          ...prevColumns,
          [column]: [...prevColumns[column], newCard],
        }));
      }
      setFormData({ id: "", title: "", description: "", column: "column1" });
      setShowModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = formData;
    validateTitle(title);
    validateDescription(description);

    if (!formErrors.title && !formErrors.description) {
      handleAddCard();
    }
  };

  const handleDeleteCard = () => {
    const { id, column } = formData;
    if (id && column) {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [column]: prevColumns[column].filter((card) => card.id !== id),
      }));
      setShowModal(false);
    }
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("text/plain");
    const sourceColumn = Object.keys(columns).find((key) =>
      columns[key].some((card) => card.id === cardId)
    );
    if (sourceColumn) {
      const cardIndex = columns[sourceColumn].findIndex(
        (card) => card.id === cardId
      );
      if (cardIndex !== -1) {
        const card = columns[sourceColumn][cardIndex];
        const updatedColumns = { ...columns };
        updatedColumns[sourceColumn] = updatedColumns[sourceColumn].filter(
          (c) => c.id !== cardId
        );
        updatedColumns[targetColumn] = [...updatedColumns[targetColumn], card];
        setColumns(updatedColumns);
      }
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Column Lists</h1>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          Add Card
        </button>
      </div>
      <div className="columns">
        {Object.entries(columns).map(([column, cards]) => (
          <Column
            key={column}
            column={column}
            cards={cards}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, column)}
            handleDragStart={handleDragStart}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <Modal
        showModal={showModal}
        onCloseModal={() => setShowModal(false)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleDeleteCard={handleDeleteCard}
        formErrors={formErrors}
      />
    </div>
  );
};

export default App;
