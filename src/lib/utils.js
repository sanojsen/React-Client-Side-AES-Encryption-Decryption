import CryptoJS from 'crypto-js';

export let encryption = (event) =>{
    var key = CryptoJS.enc.Utf8.parse(event.secret_key);
    var iv = CryptoJS.enc.Utf8.parse(event.secret_iv);

    try {
        var encrypted = CryptoJS.AES.encrypt(event.encryption_text, key,
            {
                keySize: event.key_size / 32,
                iv: iv,
                mode: event.mode == 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB
            });
        return encrypted.toString(event.output_type == 'HEX' ? CryptoJS.format.Hex : CryptoJS.format.Utf8);
    } catch (e) {
        console.log('Encryption Error', e);
    }
}

export let decryption = (event) =>{
    console.log(event)
    var key = CryptoJS.enc.Utf8.parse(event.secret_key);
    var iv = CryptoJS.enc.Utf8.parse(event.secret_iv);

    if(event.output_type == 'HEX'){
        event.decryption_text = CryptoJS.enc.Hex.parse(event.decryption_text);
        event.decryption_text = event.decryption_text.toString(CryptoJS.enc.Base64)
    }

    try {
        var decrypted = CryptoJS.AES.decrypt(event.decryption_text, key,
            {
                keySize: event.key_size / 32,
                iv: iv,
                mode: event.mode == 'CBC' ? CryptoJS.mode.CBC : CryptoJS.mode.ECB,
            });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.log('Decryption Error', e);
        // return e;
    }
}