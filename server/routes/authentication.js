const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./database.js');
const nodemailer = require('nodemailer');
const router = express.Router();
router.post('/signup', async (req, res) => {
  const { fullname,email,phone,password} = req.body;
  console.log("My email "+email);
  if (!fullname||!email||!password) {
    return res.status(400).json({ Message: 'All fields are required in order to sign up' });
  }
  const q="SELECT*FROM users WHERE email=?";
  db.query(q,[email],async(err,results)=>{
    if (err) {
      return res.status(500).json({ Message:1, error: err });
    }
    if(results.length==0)
    {
    console.log("admin name "+fullname);
      const hashed = await bcrypt.hash(password, 10);
    const admindata = [fullname,email,phone,hashed];
      const admq="INSERT INTO users (name,email,phone,password) VALUES (?,?,?,?)";
      db.query(admq,admindata,(err,result)=>{
        if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
        }
       
        const data = { message: 'Successfully registered in the maize farming recommendations',Name:fullname,Email:email};
        console.log(data);
        res.status(200).json({Message:0,Name:fullname,Email:email});
      });
    }
    else
    {
      res.status(200).json({Message:2});
    }

  })
});
router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email ||!password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, email, async (err, results) => {
    if (err) return res.status(500).json({ Message:0, error: err });

    if (results.length === 0) {
      return res.json({Message:2});
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ Message:3});
    }
  var ar=JSON.parse(JSON.stringify(results));
  console.log(results);
    res.status(200).json({Message:1,Name:ar[0].name,Email:ar[0].emai,Phone:ar[0].phone});
  });
});
router.post('/forgot', async (req, res) => {
  const {email} = req.body;
console.log(email);
  if (!email) {
    return res.status(400).json({Message: 'Enter email to reset password'});
  }

  const qry='SELECT * FROM users WHERE email= ?';
  db.query(qry, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    const size=results.length;
    console.log(size);
    if(size!=1)
    {
      res.json({Message:0});
    }
    if(size==1)
    {
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "mateilimo1@gmail.com",
    pass: "rkxd qgnq kscn wfpk",
  },
});
  try {
    var a=Math.random();
  var b=(a*1000);
  var code=Math.round(b);
  console.log(code);
  const query='UPDATE users SET resetcode=? WHERE email=?';
  db.query(query, [code,email], async (err, results) => {
    if(err){
      console.log("failed to save reset code");
    }
    else{
    const mailOptions = {
      from: "mateilimo1@gmail.com",
      to:email,
      subject:"Passwords reset maize suggestion system.",
      text: "Dear user reset your password by entering this code. "+code,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.json({Message:1,Email:email});
  }
});
  }
  catch (error) {
    res.json({Message:2});
    console.error("Error sending email:", error);
  }
    }
  });
});
router.post('/submitresetcode', async (req, res) => {
  const {code,email,password} = req.body;
  console.log("password "+password);
  const hashed = await bcrypt.hash(password, 10);
  const qry="SELECT*FROM users WHERE email=?";
  db.query(qry, [email], async (err, results) => {
    if(err){
      console.log("failed to save reset code");
      res.json({Message:0});
      return;
    }
    else{
   if(results[0].resetcode==code)
   {
  const qy="UPDATE users SET password=? WHERE email=?";
  db.query(qy, [hashed,email], async (err, results) => {
    if(err){
      console.log("failed to save reset code");
      res.json({Message:0});
      return;
    }
    else{
      res.json({Message:1});
      console.log("You have successfully changed password");
    }
  });
}
else{
  res.json({Message:2});
}
  }
});
});
module.exports = router;