const tree = require('./commands/tree')
const organize = require('./commands/organize')
const help = require('./commands/help')


let inputArr = process.argv.slice(2);

let command = inputArr[0]   //tree, organize, help 

switch(command){


        case 'tree':
            tree.treeKey(inputArr[1])
            break;
        case 'organize':
            organize.organizeKey(inputArr[1])
            break;
        case 'help':    
            help.helpKey()
            break; 
            
        default :
            console.log('Please enter a valid command')
            break;    
                
}





