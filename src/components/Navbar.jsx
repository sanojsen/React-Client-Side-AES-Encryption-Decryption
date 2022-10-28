
import {useState} from 'react';


const Navbar = () => {
  const [toogle, setToogle] = useState(false);
  
  return (
      <nav className='w-full flex py-6 px-4 justify-between items-center navbar'> 
        

          <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
            <li className="mr-2 cursor-pointer">AES Encryption</li>
            {/* <li className="mr-2 cursor-pointer">RSA Encryption</li> */}
          </ul>

          {/* <div className='sm:hidden flex flex-1 justify-end items-center'>
                  <img src={toogle ? close : menu } className="w-[28px] h-[28px] object-contain" onClick={() => setToogle((prev) => !prev)}/>

                  <div className={`${toogle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
                      <ul className='list-none flex flex-col justify-end items-center flex-1'>
                        <li className="mr-2 cursor-pointer">AES Encryption</li>
                        <li className="mr-2 cursor-pointer">RSA Encryption</li>
                      </ul>
                  </div>
          </div> */}
      </nav>
  )
}


export default Navbar