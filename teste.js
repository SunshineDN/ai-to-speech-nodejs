const decodePayload = require("./src/webhook/utils/decodePayload.js");

const uri = 'leads%5Badd%5D%5B0%5D%5Bid%5D=20881394&leads%5Badd%5D%5B0%5D%5Bstatus_id%5D=68671951&leads%5Badd%5D%5B0%5D%5Bpipeline_id%5D=8097455&account%5Bid%5D=31205035&account%5Bsubdomain%5D=kommoatende'

const decoded = decodePayload(uri);
console.dir(decoded, { depth: null });