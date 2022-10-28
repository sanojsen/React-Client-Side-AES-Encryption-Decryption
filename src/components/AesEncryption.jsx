import { useState } from 'react';
import { encryption } from '../lib/utils';
import { clipboard } from "../assets/index"

const AesEncryption = () => {


    const [isCbcMode, setMode] = useState(true);
    const [isBase64, setOutput] = useState(true);
    const [iskeyDialogon, setkeyDialog] = useState(false);
    const [keySize, setkeySize] = useState({ key_size: 128 });
    const [copyNumber, setCopyNumber] = useState('')

    const [error, setError] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    const [encText, setEncText] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [secretIv, setSecretIv] = useState('');
    const [encryptedData, setEncryptedData] = useState('');

    function setKeyBit(size) {
        setkeyDialog(false);
        setkeySize({ key_size: size })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let jsonForEncrypt = {
            encryption_text: encText,
            secret_key: secretKey,
            secret_iv: secretIv,
            key_size: keySize.key_size,
            output_type: isBase64 ? 'Base64' : 'HEX',
            mode: isCbcMode ? 'CBC' : 'ECB'
        }
        if (jsonForEncrypt.encryption_text && jsonForEncrypt.secret_key) {
            var encryptedValue = encryption(jsonForEncrypt)
            if(encryptedValue){
                setIsSubmited(false);
                setError(false);
                setEncryptedData(encryptedValue);
            }else{
                setIsSubmited(true);
                setError(true);
            }
        }else{
            setIsSubmited(false);
            setError(false);
        }
    }
    const handleEncText = (event) => {
        setEncText(event.target.value);
    }
    const handleSecretKey = (event) => {
        setSecretKey(event.target.value);
    }
    const handleSecretIv = (event) => {
        setSecretIv(event.target.value);
    }
    const handleEncryptedData = (event) => {
        setEncryptedData(event.target.value);
    }

    var timout;
    function copyToClipBoard(event, number) {
        navigator.clipboard.writeText(event);
        setCopyNumber(number);
        clearTimeout(timout);
        timout = setTimeout(() => {
            setCopyNumber('')
        }, 1500)
    }
    return (
        <div className="w-full">
            <h2 className="text-lg text-center mt-6">
                AES Encryption
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="w-full md:w-[50%] p-4 md:p-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <label htmlFor="encryption">Encryption Text</label>
                            <div className="relative for_clip">
                                <textarea className="w-full rounded bg-primary box_shadow mt-2 p-2" rows="4" placeholder="Enter text to be Encrypted" id="encText" value={encText} onChange={handleEncText}></textarea>

                                {encText && <img src={clipboard} onClick={() => copyToClipBoard(encText, 1)} className="w-[20px] h-[20px] absolute bottom-4 right-4 cursor-pointer" alt="copy" />}

                                {copyNumber && copyNumber == 1 && <div className="absolute bottom-4 right-[40px] cursor-pointer bg-primary">
                                    Copied!
                                </div>}
                            </div>

                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="encryption">Secret Key</label>
                            <div className="relative for_clip">
                                <input className="w-full rounded bg-primary box_shadow mt-2 p-2 pr-[105px]" type="text" placeholder="Enter secret key" id="secretKey" value={secretKey} onChange={handleSecretKey} />

                                {isSubmited && error && secretKey.length * 8 != keySize.key_size && <div className="mt-2 mb-3 text-center">
                                    {`You have provided ${secretKey.length *8} bit key for ${keySize.key_size} bit encryption.`}
                                </div>}

                                {secretKey && <img src={clipboard} onClick={() => copyToClipBoard(secretKey, 2)} className="w-[20px] h-[20px] absolute top-[19px] right-[85px] cursor-pointer" alt="copy" />}

                                {copyNumber && copyNumber == 2 && <div className="absolute top-[15px] right-[105px] cursor-pointer bg-primary">
                                    Copied!
                                </div>}

                                <div className="absolute top-4 right-2 text-right">
                                    <button className="px-2 bg-primary rounded btn_shadow btn_hov" type="button" onClick={() => setkeyDialog(prev => !prev)}>{keySize.key_size} Bits</button>
                                    <div className={`${iskeyDialogon ? 'block' : 'hidden'} bg-primary p-2 mt-1 rounded btn_shadow background-primary cursor-pointer text-center`}>
                                        <div className="btn_hov px-3 rounded" onClick={() => setKeyBit(128)}>
                                            128 Bits
                                        </div>
                                        <div className="btn_hov px-3 rounded" onClick={() => setKeyBit(196)}>
                                            192 Bits
                                        </div>
                                        <div className="btn_hov px-3 rounded" onClick={() => setKeyBit(256)}>
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
                            <div className="form-group mt-5">
                                <label htmlFor="encryption">IV (optional)</label>
                                <div className="relative for_clip">
                                    <input className="w-full rounded bg-primary box_shadow mt-2 p-2" type="text" placeholder="Enter initialization vector" id="secretIv" value={secretIv} onChange={handleSecretIv} />

                                    {secretIv && <img src={clipboard} onClick={() => copyToClipBoard(secretIv, 3)} className="w-[20px] h-[20px] absolute top-4 right-4 cursor-pointer" alt="copy" />}

                                    {copyNumber && copyNumber == 3 && <div className="absolute top-4 right-10 cursor-pointer bg-primary">
                                        Copied!
                                    </div>}
                                </div>
                            </div>
                        }
                        <div className="form-group mt-5 w-full">
                            <div className="w-[50%] mr-1">
                                <label htmlFor="">Output format</label>
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

                            <button className="w-full p-3 rounded btn_shadow btn_hov" type="submit">Encrypt</button>
                        </div>

                    </form>
                </div>
                <div className="w-full md:w-[50%] h-[100%] p-4 md:p-2">
                    <div className="form-group mt-3">
                        <label htmlFor="encryption">Encrypted Text</label>
                        <div className="relative for_clip">
                            <textarea className="w-full rounded bg-primary box_shadow mt-2 p-2 h-[100%]" rows="20" placeholder="Encrypted value" id="encryptedData" value={encryptedData} onChange={handleEncryptedData}></textarea>

                            {encryptedData && <img src={clipboard} onClick={() => copyToClipBoard(encryptedData, 4)} className="w-[20px] h-[20px] absolute top-6 right-4 cursor-pointer" alt="copy" />}

                            {copyNumber && copyNumber == 4 && <div className="absolute top-6 right-10 cursor-pointer bg-primary">
                                Copied!
                            </div>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AesEncryption