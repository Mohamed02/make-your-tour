import fs from 'fs';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import TourModel from '../../models/tourModel.js';
const environment = process.env.NODE_ENV;
console.log('environment', environment);
dotenv.config({ path: `../../../config/.env.${environment}` });
const DB = process.env.DATABASE_URL.replace('<PASSWORD>', process.env.DATABASE_PWD);

const port = process.env.PORT;
const a =10;
const tours = fs.readFileSync('./tours.json','utf-8');
console.log('tours',tours);
await mongoose
  .connect(DB,{
  });
const importDataToDB = async ()=>{
    try{
        await TourModel.create(JSON.parse(tours));
        console.log('import successful');
    }catch(err){
        console.log(err);
    }finally{
        process.exit();
    }
};
const deleteAllData = async ()=>{
   await TourModel.deleteMany();
   console.log('Deleteion successfull');
   process.exit();
}
console.log(process.argv);
if(process.argv[2] ==='--import'){
    importDataToDB();
}else if(process.argv[2] ==='--delete'){
    deleteAllData();
}