


var Utf8Encoder = new TextEncoder('utf-8');
var Utf8Decoder = new TextDecoder('utf-8');

const byteToHex = [];

for (let n = 0; n <= 0xff; ++n)
{
    const hexOctet = n.toString(16).padStart(2, '0');
    byteToHex.push(hexOctet);
}

export default {
    BytesToString(arr) {
        return Utf8Decoder.decode(arr);
    },
    StringToBytes(str) {
        return Utf8Encoder.encode(str);
    },
    // BytesToString(arr) {
    //     var str = '';
    //     for (var i = 0; i < arr.length; i++) {
    //         str += String.fromCharCode(arr[i]);
    //     }
        
    //     return str;
    // },
    // StringToBytes(str) {
    //     var arr = [];
    //     for (var i = 0, j = str.length; i < j; ++i) {
    //         arr.push(str.charCodeAt(i));
    //     }

    //     return new Uint8Array(arr);
    // },
    
    // const hexMapping = '0123456789abcdef';

    HexToBytes(str) {
        var arr = [];
        let ofs = 0;
        if (str[0] === '0' && str[1] === 'x') {
            // str = str.slice(2);
            ofs = 2;
            if(str.length < 2) {
                return null;
            }
        }

        if ((str.length & 1) === 1) {
            if ('0' <= str[ofs] <='9'){
                arr.push(str[ofs]-'0');
            }
            else if ('a' <= str[ofs] <='f') {
                arr.push(str[ofs]-'a'+10);
            } else {
                return null;
            }
            ofs ++;
        }


        // for (var i = 0, j = str.length; i < j; ++i) {
        //     arr.push(str.charCodeAt(i));
        // }
        arr.push.apply(arr, str.slice(ofs).match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16);
        }));
        return new Uint8Array(arr);
    },
    BytesToHex(arr) {
        const hexOctets = new Array(arr.length);
        for (let i = 0; i < arr.length; ++i)
            hexOctets[i] = byteToHex[arr[i]];

        return hexOctets.join('');
    }
};