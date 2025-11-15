const express = require('express');
const db = require('./database.js');
const router = express.Router();
router.get('/fetchdata', async (req, res) => {
  let date=new Date();     
  let day=date.getDay();
  let todaypatients=0;
  let pendingpayment=0;
  let counter=0;
let query="SELECT*FROM patients WHERE day=?";
db.query(query,[day],async(err,results)=>{
  if(err)
  {
    counter++;
  }
  else
  {
   todaypatients=results.length;
   let qry="SELECT*FROM patients WHERE paymentstatus=?";
db.query(qry,['Not Paid'],async(err,result)=>{
  if(err)
  {
    counter++;
  }
  else
  {
    pendingpayment=result.length;
    console.log(pendingpayment);
       let query="SELECT*FROM patients";
db.query(query,async(err,resul)=>{
  if(err)
  {
    counter++;
  }
  else
  {
    let q="SELECT*FROM patients WHERE followup=?";
    db.query(q,["on"],async(err,r)=>{
      if(err)
      {
        counter++;
      }
      else
      {
           if(counter==0)
    {
      res.status(200).json({Message:1,Today:todaypatients,Pending:pendingpayment,Todaypatients:results,Pendingpatients:result,Totalpatients:resul,Follow:r,Followtotal:r.length});
    }
    else
    {
    res.status(200).json({Message:2});
    }
      }

    });
  }
});
  }
});
  }
});
});
router.post('/receptionist', async (req, res) => {
  let data=req.body;
  let patientname=data.fullname;
  let residence=data.residence;
  let phone=data.tel;
  let date=new Date();
  let day=date.getDay();
  let month=date.getMonth()+1;
  let year=date.getFullYear();
  let counter=0;
let query="SELECT*FROM list WHERE phone=?";
db.query(query,[phone],async(err,results)=>{
  if(err)
  {
    counter++;
  }
  else
  {
    if(results.length==0)
    {
      let q="SELECT*FROM list";
      db.query(q,async(err,result)=>{
        if(err)
        {
          counter++
        }
        else
        {
          let number=1;
          number+=parseInt(result.length);
          let qry="INSERT INTO list (patientnumber,name,residence,phone) VALUES(?,?,?,?)";
      db.query(qry,[number,patientname,residence,phone],async(err,resul)=>{
      if(err)
      {
        counter++;
      }
      else
      {
        if(counter==0)
        {
          res.status(200).json({Name:patientname,Message:1});
        }
        else
        {
          res.status(500).json({Message:3});
        }
      }
      });
        }
      });
    }
    else
    {
      res.status(200).json({Message:2});
    }
  }

});
});
router.get('/queue', async (req, res) => {
  let counter=0;
let query="SELECT*FROM list WHERE attended=?";
db.query(query,[0],async(err,results)=>{
  if(err)
  {
    counter++;
  }
  else
  {
    
        if(counter==0)
        {
          res.status(200).json({Message:1,Queue:results});
        }
        else
        {
          res.status(500).json({Message:3});
        }
      }
});
});
router.get('/fetchanalysis', async (req, res) => {
  let date=new Date();
  let year=date.getFullYear();
  let counter=0;
  let i=0;
  let jan=0;
  let feb=0;
  let mar=0;
  let apr=0;
  let may=0;
  let jun=0;
  let jul=0;
  let aug=0;
  let sep=0;
  let oct=0;
  let nov=0;
  let dec=0;
    let janm=0;
  let febm=0;
  let marm=0;
  let aprm=0;
  let maym=0;
  let junm=0;
  let julm=0;
  let augm=0;
  let sepm=0;
  let octm=0;
  let novm=0;
  let decm=0;
let query="SELECT*FROM patients WHERE year=?";
db.query(query,[year],async(err,results)=>{
  if(err)
  {
    counter++;
  }
  else
  {
    for(i;i<results.length;i++)
    {
      if(results[i].month==1)
      {
               if(results[i].paymentstatus=='Paid')
      {
         janm+=parseFloat(results[i].amount);
      }
        jan++;
      }
       if(results[i].month==2)
      {
               if(results[i].paymentstatus=='Paid')
      {
         febm+=parseFloat(results[i].amount);
      }
        feb++;
      }
         if(results[i].month==3)
      {
               if(results[i].paymentstatus=='Paid')
      {
         marm+=parseFloat(results[i].amount);
      }
        mar++;
      }
         if(results[i].month==4)
      {
               if(results[i].paymentstatus=='Paid')
      {
         aprm+=parseFloat(results[i].amount);
      }
        apr++;
      }
         if(results[i].month==5)
      {
               if(results[i].paymentstatus=='Paid')
      {
         maym+=parseFloat(results[i].amount);
      }
        may++;
      }
         if(results[i].month==6)
      {
               if(results[i].paymentstatus=='Paid')
      {
         junm+=parseFloat(results[i].amount);
      }
        jun++;
      }
         if(results[i].month==7)
      {
        if(results[i].paymentstatus=='Paid')
      {
         julm+=parseFloat(results[i].amount);
      }
        jul++;
      }
         if(results[i].month==8)
      {
               if(results[i].paymentstatus=='Paid')
      {
         augm+=parseFloat(results[i].amount);
      }
        aug++;
      }
         if(results[i].month==9)
      {
               if(results[i].paymentstatus=='Paid')
      {
         sepm+=parseFloat(results[i].amount);
      }
        sep++;
      }
          if(results[i].month==10)
      {
        if(results[i].paymentstatus=='Paid')
      {
         octm+=parseFloat(results[i].amount);
      }
        oct++;
      }
          if(results[i].month==11)
      {
             if(results[i].paymentstatus=='Paid')
      {
         novm+=parseFloat(results[i].amount);
      }
        nov++;
      }
          if(results[i].month==12)
      {
         if(results[i].paymentstatus=='Paid')
      {
         decm+=parseFloat(results[i].amount);
      }
        dec++;
      }
      if(i==results.length-1)
      {
        if(counter==0)
        {
        res.status(200).json({Message:1,Jan:jan,Feb:feb,Mar:mar,Apr:apr,May:may,Jun:jun,Jul:jul,Aug:aug,Sep:sep,Oct:oct,Nov:nov,Dec:dec,Janm:janm,Febm:febm,Marm:marm,Aprm:aprm,Maym:maym,Junm:junm,Julm:julm,Augm:augm,Sepm:sepm,Octm:octm,Novm:novm,Decm:decm});
        }
        else
        {
           res.status(200).json({});
        }
      }
    }
  }  
});
});
router.post('/search', async(req, res) => {
  var data=req.body;
  let query=data.Query;
  console.log("my query"+query);
    let qry='SELECT*FROM patients';
  const params = [];
  if (query) {
    qry += ' WHERE LOWER(name) LIKE ? OR UPPER(patientnumber) LIKE ?';
    params.push(
      `%${query.toLowerCase()}%`,
      `%${query.toUpperCase()}%`
    );
  }
    db.query(qry,params,async (err, results) => {
     if(err)
    {
     return res.status(500).json({Message:0,error:err});
    }
  console.log(results);
      res.status(200).json({Data:results});
  });
});
router.post('/submit', (req, res) => {
  var userdata=req.body;
  let service=userdata.service;
  let biodata=userdata.biodata;
  let clinical=userdata.clinical;
  let billing=userdata.billing;
  let patienttype=service.patienttype;
  let selectedservice=service.selectedservice;
  let servicetype=' '
  if (Object.keys(service).includes('servicetype')) {
  servicetype=service.servicetype;
}
  let patientnumber=biodata.patientnumber;
  var patientname=biodata.fullname;
  console.log("patient number "+patientnumber);
  console.log("patient name "+patientname);
  let residence=biodata.residence;
  let phone=biodata.tel;
  let dateofbirth=biodata.date;
  let gender=biodata.gender;
  let kinname=biodata.kinname;
  let kincontact=biodata.kincontact;
  let relationship=biodata.relationship;
  let blood=biodata.blood;
  let clinicalone=clinical["clinicalone"];
  let complaint=clinicalone["complaint"];
  let pasthistory=clinicalone["historypast"];
  let clinicaltwo=clinical["clinicaltwo"];
  let complaintdetails=clinicaltwo["complaint"];
  let pasthistorydetails=clinicaltwo["historypast"];
  let presenthistory=clinicaltwo["historypresent"];
  let socioeconomic=clinicaltwo["social"];
  let vitals={};
  if (Object.keys(clinical).includes('clinicalthree')) {
    vitals=clinical["clinicalthree"];
  }
  let clinicalfour=clinical["clinicalfour"];
  let general=clinicalfour["general"];
  console.log("my general:"+general);
  let diagnosis=clinicalfour["diagnosis"];
  console.log("my diagnosis:"+diagnosis);
  let diagnosisdetails=clinicalfour["diagnosisd"];
  let investigate=' ';
  if (Object.keys(clinicalfour).includes('investigate')){
   investigate=clinicalfour["investigate"];
  }
  let treatment=clinicalfour["treatment"];
  let bloodtypetested='';
  if (Object.keys(clinical).includes('clinicalfive')) {
    bloodtypetested=clinical["clinicalfive"];
  }
  let followup=clinical["clinicalsix"];
  if(followup==null)
  {
    followup=" ";
  }
  let paymentstatus=billing["payment"];
  let amount=billing["amount"];
  let method=billing["method"];
  let code=billing["code"];
  let date=new Date();
  let day=date.getDay();
  let month=date.getMonth()+1;
  let dayofmonth=date.getDate();
  console.log("my month");
  let year=date.getFullYear();
  let registration=dayofmonth+"/"+month+"/"+year;
  console.log("full date "+registration);
  console.log("year"+year);
  let counter=0;
  let times=0;
  let query = 'SELECT*FROM patients WHERE patientnumber=?';
  db.query(query,[patientnumber], async (err, results) => {
    if(err)
    {
      counter++;
      console.log(err);
    }
    else
    {
       times+=parseInt(results.length);
      if(results.length==0)
      {
         let qry = 'INSERT INTO patients (name,patientnumber,residence,phone,dateofbirth,gender,namekin,phonekin,relationshiptopatient,bloodgroup,patienttype,selectedservice,servicetype,complaint,complaintdetails,pasthistory,pasthistorydetails,presenthistory,socioeconomic,vitals,general,diagnosis,diagnosisdetails,investigations,bloodtest,treatment,paymentstatus,amount,method,code,day,month,year,dateofregistration,followup) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  db.query(qry,[patientname,patientnumber,residence,phone,dateofbirth,gender,kinname,kincontact,relationship,blood,patienttype,selectedservice,servicetype,complaint,complaintdetails,pasthistory,pasthistorydetails,presenthistory,socioeconomic,JSON.stringify(vitals),general,diagnosis,diagnosisdetails,JSON.stringify(investigate),bloodtypetested,treatment,paymentstatus,amount,method,code,day,month,year,registration,followup], async (err, results) => {
    if(err)
    {
      counter++;
      console.log(err);
    }else
    {
      let q="UPDATE list SET attended=? WHERE patientnumber=?";
      db.query(q,[1,patientnumber],async(err,resultss)=>{
        if(err)
        {
          counter++;
          console.log(err);
        }
        else
        {
            if(counter==0)
      {
      res.status(200).json({Message:1,name:patientname,patientnumber:patientnumber,dateofbirth:dateofbirth,phone:phone,residence:residence,dateofregistration:registration});
      }
      else
      {
        res.status(200).json({Message:3});
      }
        }
      });
    }
      });
    }
    else
    {
        let qry = 'INSERT INTO patients (name,patientnumber,residence,phone,dateofbirth,gender,namekin,phonekin,relationshiptopatient,bloodgroup,patienttype,selectedservice,servicetype,complaint,complaintdetails,pasthistory,pasthistorydetails,presenthistory,socioeconomic,vitals,general,diagnosis,diagnosisdetails,investigations,bloodtest,treatment,paymentstatus,amount,method,code,day,month,year,dateofregistration,followup) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  db.query(qry,[patientname,patientnumber,residence,phone,dateofbirth,gender,kinname,kincontact,relationship,blood,patienttype,selectedservice,servicetype,complaint,complaintdetails,pasthistory,pasthistorydetails,presenthistory,socioeconomic,JSON.stringify(vitals),general,diagnosis,diagnosisdetails,JSON.stringify(investigate),bloodtypetested,treatment,paymentstatus,amount,method,code,day,month,year,registration,followup], async (err, results) => {
    if(err)
    {
      console.log(err);
    }
    else
    {
       res.status(200).json({Message:2,Times:times,name:patientname,patientnumber:patientnumber,dateofbirth:dateofbirth,phone:phone,residence:residence,dateofregistration:registration});
    }
  });
    }
}
});
});
module.exports = router;