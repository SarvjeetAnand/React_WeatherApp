import React,{useState} from 'react';
import './error.css';

export default function Error() {

    const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClose = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="overlay">
        <div class="message-box">
            <h2>City Not Found</h2>
            <p>Enter Correct City!</p>
            <button class="ok-btn" onClick={handleClose}>OK</button>
        </div>
    </div>
  )
}
