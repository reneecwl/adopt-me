import "./PhotoList.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PhotoList({ searchQuery }) {
  const [photos, setPhotos] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${baseUrl}/`);
        setPhotos(response.data);
      } catch (error) {
        console.error("The animals are still on their way", error);
      }
    };
    fetchPhotos();
  }, []);

  const filteredPhotos = searchQuery
    ? photos.filter(
        (photo) =>
          photo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          photo.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : photos;

  const handleClick = (photoName) => {
    const emailSubject = `Adoption Inquiry: ${photoName}`;
    const mailtoLink = `mailto:info@pawfectmatch.com?subject=${emailSubject}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="photolist">
      {filteredPhotos.length === 0 ? (
        <div className="photolist__no-result">Your pawfect match is still on the way!</div>
      ) : (
        filteredPhotos.map((photo) => (
          <div key={photo.id} className="photolist__card">
            <img
              src={`${baseUrl}${photo.photo}`}
              alt={photo.type}
              className="card__image"
            />
            <div className="card__name">Name: {photo.name}</div>
            <div className="card__type">Type: {photo.type}</div>
            <div className="card__description">{photo.description}</div>
            <button
              className="card__button"
              onClick={() => handleClick(photo.name)}
            >
              Adopt me!
            </button>
          </div>
        ))
      )}
    </div>
  );
}
