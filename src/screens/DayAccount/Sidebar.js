import React from 'react';

const Sidebar = ({ isOpen, onClose, onSelectCard }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <button onClick={() => onSelectCard('machineReading')}>Card 1</button>
      <button onClick={() => onSelectCard('checkerSaleWinData')}>Card 2</button>
      <button onClick={() => onSelectCard('shopSaleWinData')}>Card 3</button>
      {/* Add more buttons as needed */}
    </div>
  );
};

export default Sidebar;