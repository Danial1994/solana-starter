import wallet from "../Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://devnet.irys.xyz/Ghr15Hxn8Gd2KLnR3AcpCbxuLiuzYNcGtSt83BbdGr9p"
        const metadata = {
             name: "dTok sing rug",
             symbol: "dTokSR",
             description: "you have been detoxed!",
             image: image,
             attributes: [
                 {trait_type: 'color', value: 'green'},
                 {trait_type: 'size', value: '85'},
                 {trait_type: 'rarity', value: '100%'},
             ],
             properties: {
                 files: [
                     {
                         type: "image/png",
                         uri: image
                     },
                 ]
             },
             creators: [keypair.publicKey]
         };
        const myUri = await umi.uploader.uploadJson(metadata);
         console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
