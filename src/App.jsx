import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "`~!@#$%^&*()-_=+[{]}\\|;:',<.>/?*";
    }

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  const passwordRef = useRef();

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator, setPassword]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-10 w-full max-w-3xl justify-center items-center bg-gray-600 mx-auto px-[100px] py-[100px] rounded-md h-auto">
          <div className="min-w-80 w-full flex mx-auto h-auto">
            <input
              type="text"
              name=""
              value={password}
              className="w-full block text-black"
              ref={passwordRef}
            />
            <button
              className="text-white py-3 px-10 bg-red-500"
              onClick={copyToClipBoard}
            >
              Copy
            </button>
          </div>
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-4 text-red-500 text-xl">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer "
                id="length"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="length">Length : {length}</label>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                value={numberAllowed}
                className="w-5 h-5 rounded-md"
                id="numberAllowed"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberAllowed" className="text-red-500 text-xl">
                Allow Number
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded-md"
                value={charAllowed}
                id="allowChar"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="allowChar" className="text-red-500 text-xl">
                Allow Character
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
