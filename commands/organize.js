const fs = require('fs');
const path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf", "xlsx","xls","odt", "ods","odp", "odg","odf",  "txt",  "ps",  "tex",],
    app: ["exe", "dmg", "pkg", "deb"],
    images: ["png","jpeg","jpg","JPG"]
};

function organizeFn(dirpath){

    let destPath

    if(dirpath==undefined){
        console.log('Please enter a valid directory path with quotes')
        return;
    } else{
        let doesExist = fs.existsSync(dirpath)
        
        if(doesExist==true){
            destPath = path.join(dirpath,'organized_files');

            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath)
                //console.log('Organized and organized folder created')
            }else{
                console.log('This folder already exists');
            }
        }else{
            console.log('Please enter a valid path');
        }
    }
    organizeHelper(dirpath, destPath)

}

//this funtion to categorize the files//
function organizeHelper(src, dest){
    let childNames = fs.readdirSync(src) //get all files and folder inside the dirpath folder
    
    for(let i=0; i<childNames.length;i++){
        let childAddress = path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile()

        if(isFile==true){
            let fileCategory = getCategory(childNames[i])
            sendFiles(childAddress, dest, fileCategory)
        }
    }
}

function getCategory(name){
    let ext = path.extname(name)
    ext = ext.slice(1)   // removes . from the ext

    for(let type in types){  //special loop for object(types is a object)
        let cTypeArr = types[type]

        for(let i=0; i<cTypeArr.length;i++){
            if(ext == cTypeArr[i])      //matched ext witt cTypeArr

            return type
        }
    }
    return  'others'   
}

function sendFiles(srcFilePath, dest, fileCategory){
    let catPath = path.join(dest,fileCategory)

    if(fs.existsSync(catPath)==false){
            fs.mkdirSync(catPath)
    }
    let fileName = path.basename(srcFilePath)
    let destFilePath = path.join(catPath, fileName)
    fs.copyFileSync(srcFilePath, destFilePath)
    fs.unlinkSync(srcFilePath)
    console.log(fileName + "is copied to " + fileCategory)
}

module.exports = {
    organizeKey: organizeFn
}