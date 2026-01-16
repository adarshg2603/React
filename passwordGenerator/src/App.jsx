import {useState , useCallback, useEffect, useRef} from 'react'

function App() {
  const [length , setLength] = useState(6)
  const [numAllowed , setNumAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [ password , setPassword] = useState("")

  const passRef = useRef(null)

  let buttonStyle = document.querySelector('button')
  const passGen = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*()_+"
    }

    for(let i = 0 ; i <  length ; i++){
      let char = Math.floor(Math.random() * str.length) 
      pass += str.charAt(char)
    }
    buttonStyle.textContent = "Copy"
    setPassword(pass)

  } , [length , numAllowed , charAllowed , setPassword])

  const copy = useCallback(() => {
    passRef.current.select()
    window.navigator.clipboard.writeText(password)
    buttonStyle.textContent = "Copied"
    setTimeout(() => {
      buttonStyle.textContent = "Copy"
    } , 1000)
  } , [password])
    
  useEffect(() => {
    passGen()
  } , [length , numAllowed , charAllowed ])

  return (
    <div className='w-full py-2 max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-2xl text-center '>Password Generator</h1>
      <div className='flex shadow rounded-lg  overflow-hidden my-4'>
      <input 
      type="text" 
      value={password}
      className=' outline-none w-full py-1 relative placeholder-gray-400 bg-white  px-3'
      placeholder='Password'
      readOnly
      ref={passRef}
      
      />
      <button className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
      onClick={
        copy}>Copy</button>
      </div>
      <div className='flex text-sm m-3 gap-x-2'>
        <div className='flex items-center  gap-x-1'>
          <input
           type="range"
           min={6}
           max={16}
           value={length}
          
           className='cursor-pointer outline-0 bg-gray-300 accent-blue-700 apprearance-none'
           onChange={(e) => {setLength(e.target.value)}}
           />
           <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={() => {
            setNumAllowed((prev) => !prev);
          }}
          />
          <label  htmlFor='numberInput'>Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          id="charInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
          />
          <label  htmlFor='charInput'>Include Characters</label>
        </div>
        
      </div>
      <div>
        <div className='flex justify-center'>
          <button className='bg-
           text-white w-50 bg-orange-600  rounded-full relative ' onClick={() => passGen()} >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  )

} 
export default App
