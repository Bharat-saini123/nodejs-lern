import fs from "fs";
import os from "os";


// console.log(os.cpus().length)

// const data=fs.writeFileSync("example.txt", "Hello, world!");


// fs.writeFile("example2.txt","new hello bhai",(err)=>{
//     console.log(err,"err")
// })
// fs.readFile("example.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

// const syncReadFile=fs.readFileSync("./example2.txt", "utf8");
// console.log(syncReadFile)


// fs.unlink("example2.txt",(err)=>{
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log("File deleted successfully");
// })

// const unLinkSync=fs.unlinkSync("example.txt");
// console.log(unLinkSync,"example.txt deleted successfully");

// fs.copyFile("./example2.txt", "./example3.txt",(err)=>{
// console.log(err,"err")
// })

// fs.mkdir("app",(err)=>{
// console.log(err,"err")
// })

// fs.writeFile("app/src/example.txt","dannie daniel",(err)=>{
//     console.log(err,"err")
// });

// fs.truncate("./example2.txt",(err,result)=>{
//     if(err){
//         console.log(err,"err")
//     }else{
//         console.log(result,"result")
//     }
// })