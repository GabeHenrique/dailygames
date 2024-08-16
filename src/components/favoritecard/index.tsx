"use client"
import {FiEdit, FiX} from "react-icons/fi";
import {useState} from "react";

export function FavoriteCard() {
  const [input, setInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [gameName, setGameName] = useState('');

  function handleButton() {
    setShowInput(!showInput);

    setGameName(input);
    setInput('');
  }

  return (
    <div className='w-full bg-gray-900 p-4 h-44 text-white rounded-lg flex justify-between flex-col'>
      {showInput ? (
        <div className="flex items-center justify-center gap-3">
          <input
            className="w-full rounded-md h-8 text-black px-2"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button>
            <FiX size={24} color="#FFFFFF" onClick={handleButton}/>
          </button>
        </div>
      ) : (
        <button
          className='self-start hover:scale-110 duration-200 transition-all'
          onClick={handleButton}>
          <FiEdit size={24} color="#FFFFFF"/>
        </button>
      )}
      {gameName !== '' ? (
        <div>
          <span className="text-white">Jogo Favorito:</span>
          <h1 className='text-2xl font-bold'>{gameName}</h1>
        </div>
      ) : (
        <p className="font-bold text-white">Adicionar jogo</p>)}
    </div>
  );
}