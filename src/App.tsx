import { useEffect, useRef, useState } from 'react';
import Keyboard from './Keyboard';
import { useStore, NUMBER_OF_GUESSES, WORD_LENGTH } from './store';
import { isValidWord } from './word-utils';
import WordRow from './WordRow';
import Footer from './components/Footer';

export default function App() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();

  const [showInvalidGuess, setInvalidGuess] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {
        setInvalidGuess(false);
        addGuess(previousGuess);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  const isGameOver = state.gameState !== 'playing';

  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < NUMBER_OF_GUESSES) {
    currentRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(''));

  return (
    <div className="mx-auto w-96 relative h-screen p-2">
      <header className="border-b border-gray-400 py-4">
        <h1 className="text-3xl font-bold text-center uppercase">
          <span className="text-[#bada55]">W</span>
          <span className="text-[#173f5b]">O</span>
          <span className="text-[#217b4b]">O</span>
          <span className="text-[#7c2237]">R</span>
          <span className="text-[#5955da]">D</span>
          <span className="text-[#fa3ebe]">L</span>
          <span className="text-[#771c66]">E</span>
          </h1>
        <h5 className="text-1xl font-bold text-center uppercase">Woordle in Afrikaans</h5>
      </header>

      <main className="grid grid-rows-6 gap-4 my-4">
        {rows.map((word, index) => (
          <WordRow
            key={index}
            word={word.guess}
            result={word.result}
            className={
              showInvalidGuess && index === currentRow ? 'animate-bounce' : ''
            }
          />
        ))}
      </main>

      <Keyboard
        onClick={(key) => {
          addGuessLetter(key);
        }}
      />

      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white border border-gray-500 rounded text-center
            w-11/12 h-1/2 p-6 left-0 right-0 mx-auto top-1/4
           grid grid-rows-4"
        >
          <p>Speletjie is Klaar</p>
          <WordRow
            word={state.answer}
            className="items-center justify-items-center"
          />

          <button
            className="border border-green-500 rounded bg-green-500 p-2 mt-4 text-gray-800 shadow"
            onClick={() => {
              state.newGame();
              setGuess('');
            }}
          >
            Speel Veer
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState('');

  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === WORD_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return [guess, setGuess, addGuessLetter];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
