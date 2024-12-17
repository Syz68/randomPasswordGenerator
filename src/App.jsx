import { useState,useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(4)
  const [numberEnable, setNumberEnable] = useState(false)
  const [charactersEnable, setCharactersEnable] = useState(false)
  const [password, setPassword] = useState("")
  const [upperCaseEnable, setUpperCaseEnable] = useState(false)
  const passwordRef = useRef()

  const passwordGenerator = useCallback(() =>{
    let passphrase = ""
    let str = "abcdefghijklmnopqrstuvwxyz"

    if(upperCaseEnable){
      str = str + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if(numberEnable){
      str = str + "0123456789"
    }
    if (charactersEnable) {
      str = str + "!@#$%^&*"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      passphrase += str.charAt(char)  
    }
    setPassword(passphrase)

  } , [length,upperCaseEnable, numberEnable, charactersEnable, setPassword])

  useEffect(() =>{passwordGenerator()},
  [length, numberEnable, charactersEnable, passwordGenerator]
  )

  const copyPassword =useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
  <div className="bg-gray-700 w-full max-w-xl mx-auto rounded-lg shadow-lg px-4 py-3 my-20 text-orange-400 shadow-black " >
    <h1 className='text-center text-3xl font-bold my-3 text-white'>Random Password Generator</h1>
  <div className="flex shadow-md overflow-hidden mb-4 ">

    <input 
      type="text"   
      className="outline-none w-full px-2 py-1 rounded-md font-bold  "
      placeholder="Password"
      readOnly
      value={password}
      ref={passwordRef}
    />
    <button
      onClick={copyPassword}
      className="outline-none bg-blue-700 text-white px-3 py-1 rounded-md hover:bg-blue-800 "
    >Copy</button>
  </div>

  <div className="flex text-md mb-2 gap-x-4" >
      <div className="flex gap-x-2">
          <input 
          type="range"
          min={4}
          max={100} 
          className="cursor-pointer"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          
          />
          <label >Length: {length} </label>
      </div>

      <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked ={upperCaseEnable}
          onChange={() =>{ 
            setUpperCaseEnable((prev) => !prev)
          } 
        }    
          />
          <label>UpperCase</label>
        </div>


        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked ={numberEnable}
          onChange={() =>{ 
            setNumberEnable((prev) => !prev)
          } 
        }   
          
          />
          <label>Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked ={charactersEnable}
          onChange={() =>{ 
            setCharactersEnable((prev) => !prev)
          } 
        }   
          
          />
          <label>Characters</label>
        </div>


    </div>

  </div>
    
  )
}

export default App
