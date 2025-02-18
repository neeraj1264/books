import React, { useState } from "react";
import "./App.css";

function App() {
  // Mock data for nearby books
  const [nearbyBooks, setNearbyBooks] = useState([
    {
      id: 1,
      title: "S.H.A.R.P Insights ENGLISH",
      price: 700,
      distance: 108,
      image: "/book.png", 
    },
    {
      id: 2,
      title: "Physics Book",
      price: 1300,
      distance: 200,
      image: "/book.png", 

    },
    {
      id: 3,
      title: "Chemistry Book",
      price: 900,
      distance: 150,
      image: "/book.png", 
    },
  ]);

  // States to handle modal visibility and new book form
  const [showModal, setShowModal] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookPrice, setNewBookPrice] = useState("");
  const [newBookDistance, setNewBookDistance] = useState("");
  const [newBookImage, setNewBookImage] = useState(null);

  // Toggle modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBookImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Submit new book
  const handleAddBook = () => {
    const newBook = {
      id: nearbyBooks.length + 1,
      title: newBookTitle,
      price: newBookPrice,
      distance: newBookDistance,
      image: newBookImage || "https://via.placeholder.com/120x180.png?text=Book",
    };
    setNearbyBooks([...nearbyBooks, newBook]);

    // Reset form fields
    setNewBookTitle("");
    setNewBookPrice("");
    setNewBookDistance("");
    setNewBookImage(null);

    // Close modal
    setShowModal(false);
  };

  return (
    <div className="app-container">
      {/* Search Bar */}
      <header className="header">
        <input
          type="text"
          placeholder="Search Books"
          className="search-input"
        />
      </header>

      {/* Banner Section */}
      <section className="banner">
        <h1>BUY USED BOOK, SAVE EARTH</h1>
        <p>
          For every used book you buy, you save <strong>0.018 Trees</strong>, 
          <strong>3 Gallons</strong> of water, <strong>6 kWh</strong> of energy, 
          and <strong>2.25 kg</strong> of CO<sub>2</sub> emissions.
        </p>
      </section>

      {/* Nearby Books Section */}
      <section className="nearby-books">
        <h2>Your nearby books</h2>
        <div className="book-cards-container">
          {nearbyBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-info">
                <p className="book-title">{book.title}</p>
                <p className="book-price">₹ {book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fab" onClick={toggleModal}>
        +
      </button>

      {/* Modal for Uploading New Book */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Book</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: "1rem" }}
            />
            {newBookImage && (
              <img
                src={newBookImage}
                alt="Preview"
                style={{ width: 100, marginBottom: "1rem" }}
              />
            )}

            <input
              type="text"
              placeholder="Book Title"
              value={newBookTitle}
              onChange={(e) => setNewBookTitle(e.target.value)}
              className="modal-input"
            />
            <input
              type="number"
              placeholder="Price"
              value={newBookPrice}
              onChange={(e) => setNewBookPrice(e.target.value)}
              className="modal-input"
            />
            <input
              type="number"
              placeholder="Distance (in meters)"
              value={newBookDistance}
              onChange={(e) => setNewBookDistance(e.target.value)}
              className="modal-input"
            />

            <button onClick={handleAddBook} className="modal-button">
              Add Book
            </button>
            <button onClick={toggleModal} className="modal-button-cancel">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
