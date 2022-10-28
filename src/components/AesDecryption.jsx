import { useState } from 'react';
import { decryption } from '../lib/utils';
import { clipboard } from "../assets/index";

const AesDecryption = () => {

      
    const [isCbcMode, setMode] = useState(true);
    const [isDataJson, setIsDataJson] = useState(false);
    const [isBase64, setOutput] = useState(true);
    const [iskeyDialogon, setkeyDialog] = useState(false);
    const [keySize, setkeySize] = useState({key_size : 128});
    const [isJsonDisplay , setIsJsonDisplayToogle] = useState(false);
    const [copyNumber, setCopyNumber] = useState('');

    const [error, setError] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    const [decText, setDecText] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [secretIv, setSecretIv] = useState('');
    const [decryptedData, setDecryptedData] = useState('');
    const [formatedJson, setFormatedJson] = useState('');

    function setKeyBit(size) {
        setkeyDialog(false);
        setIsSubmited(false);
        setkeySize({key_size : size})
    }

    var errTimout;
    const handleSubmit = (event) => {
        event.preventDefault();
        let jsonForDecrypt = {
            decryption_text : decText,
            secret_key : secretKey,
            secret_iv : secretIv,
            key_size : keySize.key_size,
            output_type : isBase64 ? 'Base64' : 'HEX',
            mode : isCbcMode ? 'CBC' : 'ECB'
        }
        if(jsonForDecrypt.decryption_text && jsonForDecrypt.secret_key ){
            var decryptedData = decryption(jsonForDecrypt);
            if(decryptedData){
                setIsSubmited(false);
                setError(false);
                setDecryptedData(decryptedData);
            }else{
                setIsSubmited(true);
                setError(true);
            } 
        }else{
            setError(false)
            setIsSubmited(false);
            return;
        }
        
        if(isJsonString(decryptedData)){
            let data =  JSON.parse(decryptedData);
            setIsDataJson(true);
            setFormatedJson(data);
        }else{
            setIsDataJson(false);
            setIsJsonDisplayToogle(false);
        }
        
    }
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    const handleDecText = (event) => {
        setDecText(event.target.value);
    }

    const handleSecretKey = (event) =>{
        setSecretKey(event.target.value);
    }
    const handleSecretIv = (event) =>{
        setSecretIv(event.target.value);
    }
    const handleDecryptedData = (event) =>{
        setDecryptedData(event.target.value);
    }
    var timout;
    function copyToClipBoard(event,number){
        navigator.clipboard.writeText(event);
        setCopyNumber(number);
        clearTimeout(timout);
        timout = setTimeout(()=> {
            setCopyNumber('')
        },1500)
    }
    return (
        <div className="w-full">
            <h2 className="text-lg text-center">
                AES Decryption
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-[50%] p-4 md:p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-5">
                            <label htmlFor="encryption">Encrypted text</label>
                  

                            <div className="relative for_clip">
                                <textarea className="w-full rounded bg-primary box_shadow mt-2 p-2" rows="4" placeholder="Enter text to be Decrypted"  id="decText" value={decText}  onChange={handleDecText}></textarea>

                                {decText && <img src={clipboard} onClick={() => copyToClipBoard(decText,1)} className="w-[20px] h-[20px] absolute bottom-4 right-4 cursor-pointer" alt="copy" />}
                                
                                {copyNumber && copyNumber == 1 && <div className="absolute bottom-4 right-[40px] cursor-pointer bg-primary">
                                    Copied!
                                </div>}
                            </div>
                        </div>

                        <div className="form-group mt-5">
                            <label htmlFor="encryption">Secret Key</label>
                            <div className="relative for_clip">
                                <input className="w-full rounded bg-primary box_shadow mt-2 p-2 pr-[105px]" type="text" placeholder="Enter secret key" id="secretKey" value={secretKey}  onChange={handleSecretKey} />

                                {isSubmited && error && secretKey.length * 8 != keySize.key_size && <div className="mt-2 mb-3 text-center">
                                    {`You have provided ${secretKey.length *8} bit key for ${keySize.key_size} bit encryption.`}

                                </div>}
                                
                                {secretKey && <img src={clipboard} onClick={() => copyToClipBoard(secretKey,2)} className="w-[20px] h-[20px] absolute top-[19px] right-[85px] cursor-pointer" alt="copy" />}

                                {copyNumber && copyNumber == 2 && <div className="absolute top-[15px] right-[105px] cursor-pointer bg-primary">
                                    Copied!
                                </div>}

                                <div className="absolute top-4 right-2 text-right">
                                    <button className="px-2 bg-primary rounded btn_shadow btn_hov" type="button" onClick={() => setkeyDialog(prev => !prev)}>{keySize.key_size} Bits</button>
                                    <div className={`${iskeyDialogon ? 'block' : 'hidden'} bg-primary p-2 mt-1 rounded btn_shadow background-primary cursor-pointer text-center`}>
                                        <div className="btn_hov px-3 rounded" onClick={() => setKeyBit(128)}>
                                            128 Bits
                                        </div>
                                        <div className="btn_hov px-3 rounded" onClick={() => setKeyBit(192)}>
                                            192 Bits
                                        </div>
                                        <div className="btn_hov px-3 rounded"  onClick={() => setKeyBit(256)}>
                                            256 Bits
                                        </div>
                                    </div>
                                </div>
                    
                            </div>
                        </div>

                        <div className="form-group mt-5 w-full">
                            <div className="w-[50%] mr-1">
                                <label htmlFor="">Select mode</label>
                                <div className="top-4 right-2 mt-2 flex rounded bg-primary box_shadow p-1">
                                    <button onClick={() => setMode(true)} className={`px-2 rounded btn_shadow btn_hov w-[50%] ${isCbcMode ? 'btn_down' : ''}`} type="button">CBC</button>
                                    <button onClick={() => setMode(false)} className={`px-2 rounded btn_shadow btn_hov w-[50%] ${isCbcMode ? '' : 'btn_down'}`} type="button">ECB</button>
                                </div>
                            </div>
                        </div>
                        {isCbcMode &&
                            <div className="form-group mt-5 ">
                                <label htmlFor="encryption">IV (optional)</label>
                                <div className="relative for_clip">
                                    <input className="w-full rounded bg-primary box_shadow mt-2 p-2" type="text" placeholder="Enter initialization vector" id="secretIv" value={secretIv}  onChange={handleSecretIv}/>

                                    {secretIv && <img src={clipboard} onClick={() => copyToClipBoard(secretIv,3)} className="w-[20px] h-[20px] absolute top-4 right-4 cursor-pointer" alt="copy" />}

                                    {copyNumber && copyNumber == 3 && <div className="absolute top-4 right-10 cursor-pointer bg-primary">
                                    Copied!
                                    </div>}
                                </div>
                         
                            </div>
                        }
                        <div className="form-group mt-5 w-full">
                            <div className="w-[50%] mr-1">
                                <label htmlFor="">Input format</label>
                                <div className="top-4 right-2 mt-2 flex rounded bg-primary box_shadow p-1">
                                    <button onClick={() => setOutput(true)} className={`px-2 rounded btn_shadow btn_hov w-[50%] ${isBase64 ? 'btn_down' : ''}`} type="button">Base64</button>
                                    <button onClick={() => setOutput(false)} className={`px-2 rounded btn_shadow btn_hov w-[50%] ${isBase64 ? '' : 'btn_down'}`} type="button">HEX</button>
                                </div>  
                            </div>
                        </div>

                        <div className="form-group mt-10">
                            {isSubmited && error && <div className="mt-2 mb-3 text-center">
                                    Oops, Decryption Error !!
                            </div>}
                            <button className="w-full p-3 rounded btn_shadow btn_hov" type="submit">Decrypt</button>
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-[50%] h-[100%] p-4 md:p-2">
                    <div className="form-group mt-5">
                        <div className="flex justify-between">
                            <label htmlFor="encryption">Decrypted {isJsonDisplay ? 'JSON' : 'Text'}</label>
                            {isDataJson && <button className="cursor-pointer rounded rounded btn_shadow btn_hov px-4" onClick={() => setIsJsonDisplayToogle((prev) => !prev)}>{isJsonDisplay ? 'Text' : 'JSON'}</button>}
                        </div>
                        <div>

                            <div className="relative for_clip">
                                {decryptedData && <img src={clipboard} onClick={() => copyToClipBoard(decryptedData,4)} className="w-[20px] h-[20px] absolute top-6 right-4 cursor-pointer" alt="copy" />}
                            
                                {copyNumber && copyNumber == 4 && <div className="absolute top-6 right-10 cursor-pointer bg-primary">
                                    Copied!
                                </div>}

                                {!isJsonDisplay && <textarea className="w-full rounded bg-primary box_shadow mt-2 p-2 h-[100%]" rows="20" placeholder="Decrypted value" id="decryptedData" value={decryptedData}  onChange={handleDecryptedData}></textarea> }
                            </div>
                       
                        
                            {isJsonDisplay && <pre className="w-full rounded bg-primary box_shadow mt-2 p-2 h-3/4 scrollbar">{JSON.stringify(formatedJson, null, 2)}</pre>}
                        </div>
                    
                    </div>
                </div>
            </div>

        </div>
    )
}


export default AesDecryption