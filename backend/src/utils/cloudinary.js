import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
    cloud_name: 'dn9i2bd6l', 
    api_key: '599791735694575', 
    api_secret: '7bglo2lSzQ7-84tQjnX20ZWbR10'
})

const uploadClodinary = async (localPathFile)=>{
    try{
        if(!localPathFile) return null
        const response = await cloudinary.uploader.upload(localPathFile ,{
            resource_type : "auto"
        })
         //file uploaded
        console.log("file uploaded" , response.url)

        return response.url

       
    }catch(error){
           fs.unlinkSync(localPathFile)
           return null
    }

}

export {uploadClodinary}