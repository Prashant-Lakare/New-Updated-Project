// // const express = require("express");
// // const mongoose = require("mongoose");
// // const bcrypt = require("bcrypt");
// // const cors = require("cors");
// // const jwt = require("jsonwebtoken");
// // const secretKey = "yourSecretKey";
// // const bodyParser = require('body-parser');

// // const app = express();
// // const PORT = process.env.PORT || 3001;
// // app.use(bodyParser.json());

// // const uri = "mongodb+srv://avinash:avinash@cluster0.rlhitli.mongodb.net/";

// // // Connect to MongoDB Atlas
// // mongoose
// //   .connect(uri, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //     dbName: "registration_db", // Specify the database name
// //   })
// //   .then(() => console.log("Connected to MongoDB Atlas"))
// //   .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// // // Define Trainer schema
// // const trainerSchema = new mongoose.Schema({
// //   username: { type: String, required: true },
// //   password: { type: String, required: true },
// //   name: { type: String, required: true },
// //   email: { type: String, required: true },
// //   contactNumber: { type: String, required: true },
// //   skills: { type: String, required: true },
// //   address: { type: String, required: true },
// //   chargePerDay: { type: String, required: true },
// //   role: { type: String, default: "trainer" },
// // });

// // // Define Company schema
// // const companySchema = new mongoose.Schema({
// //   uniqueId: { type: String, required: true },
// //   companyName: { type: String, required: true },
// //   location: { type: String, required: true },
// //   phone: { type: String, required: true },
// //   email: { type: String, required: true },
// //   password: { type: String, required: true },
// //   domain: { type: String, required: true },
// //   role: { type: String, default: "company" },
// // });

// // // Business request for trainer
// // const businessRequestSchema = new mongoose.Schema({
// //   uniqueId: String, // Add a reference to the uniqueId of the company
// //   batchName: String,
// //   technology: String,
// //   numberOfTrainees: Number,
// //   durationOfTraining: Number,
// //   startDate: Date,
// //   endDate: Date,
// //   trainingBudget: Number,
// // });

// // // Define the feedback schema
// // const feedbackSchema = new mongoose.Schema({
// //   company_id: String,
// //   trainer_name: String,
// //   trainer_id: String,
// //   stars: Number,
// //   feedback_description: String,
// // });

// // const Feedback = mongoose.model("Feedback", feedbackSchema);
// // const Trainer = mongoose.model("Trainer", trainerSchema);
// // const Company = mongoose.model("Company", companySchema);
// // const BusinessRequest = mongoose.model('BusinessRequest', businessRequestSchema);


// // app.use(cors());
// // app.use(express.json());

// // const authenticateJWT = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (authHeader) {
// //     const token = authHeader.split(" ")[1]; // Bearer <token>

// //     jwt.verify(token, secretKey, (err, user) => {
// //       if (err) {
// //         console.error("JWT Verification Error:", err); // Log verification errors
// //         return res.sendStatus(403); // Forbidden
// //       }

// //       console.log("Decoded Token:", user); // Log decoded user information
// //       req.user = user;
// //       next();
// //     });
// //   } else {
// //     res.sendStatus(401); // Unauthorized
// //   }
// // };

// // const authorizeRole = (roles) => (req, res, next) => {
// //   if (roles.includes(req.user.role)) {
// //     next();
// //   } else {
// //     res.sendStatus(403); // Forbidden
// //   }
// // };

// // // Trainer registration endpoint
// // app.post("/trainers", async (req, res) => {
// //   try {
// //     const {
// //       username,
// //       password,
// //       name,
// //       email,
// //       contactNumber,
// //       skills,
// //       address,
// //       chargePerDay,
// //     } = req.body;

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newTrainer = new Trainer({
// //       username,
// //       password: hashedPassword,
// //       name,
// //       email,
// //       contactNumber,
// //       skills,
// //       address,
// //       chargePerDay,
// //     });

// //     await newTrainer.save();
// //     res.status(201).json({ message: "Trainer registered successfully" });
// //   } catch (error) {
// //     console.error("Error registering trainer:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // // Company registration endpoint
// // app.post("/companies", async (req, res) => {
// //   try {
// //     const { email } = req.body;

// //     // Check if email already exists
// //     const existingCompany = await Company.findOne({ email });
// //     if (existingCompany) {
// //       return res.status(400).json({ message: "Email already exists" });
// //     }

// //     // If email doesn't exist, proceed with registration
// //     const { uniqueId, companyName, location, phone, password, domain } =
// //       req.body;

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newCompany = new Company({
// //       uniqueId,
// //       companyName,
// //       location,
// //       phone,
// //       email,
// //       password: hashedPassword,
// //       domain,
// //     });

// //     await newCompany.save();
// //     res.status(201).json({ message: "Company registered successfully" });
// //   } catch (error) {
// //     console.error("Error registering company:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // app.post("/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // Check if the provided credentials are for the admin
// //     if (email == "admin@gmail.com" && password == "admin") {
// //       // Generate token for admin as well
// //       const token = jwt.sign({ email, role: "admin" }, secretKey, {
// //         expiresIn: "1h",
// //       });
// //       return res.status(200).json({ role: "admin", token }); // Return admin role and token
// //     }

// //     // Proceed with regular user login for trainer or company
// //     let user = await Trainer.findOne({ email });
// //     let role = "trainer";

// //     if (!user) {
// //       user = await Company.findOne({ email });
// //       role = "company";

// //       // Check if the company user has a uniqueId
// //       if (!user || !user.uniqueId) {
// //         return res.status(401).json({ message: "Invalid credentials" });
// //       }
// //     }

// //     const isPasswordValid = await bcrypt.compare(password, user.password);
// //     if (isPasswordValid) {
// //       // Generate token with additional uniqueId for company users
// //       const tokenPayload = { email: user.email, role };
// //       if (role === "company") {
// //         tokenPayload.uniqueId = user.uniqueId;
// //       }

// //       const token = jwt.sign(tokenPayload, secretKey, {
// //         expiresIn: "1h",
// //       });

// //       res.status(200).json({ role, token }); // Send the token to the client
// //     } else {
// //       return res.status(401).json({ message: "Invalid credentials" });
// //     }
// //   } catch (error) {
// //     console.error("Error during login:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });


// // // Modify the admin-dashboard route to apply authentication middleware
// // app.get(
// //   "/admin-dashboard",
// //   authenticateJWT, // Apply authentication middleware
// //   authorizeRole(["admin"]), // Apply authorization middleware
// //   (req, res) => {
// //     // Admin dashboard code
// //     res.send("Welcome to the Admin Dashboard");
// //   }
// // );

// // app.get(
// //   "/trainer-dashboard",
// //   authenticateJWT,
// //   authorizeRole(["trainer"]),
// //   (req, res) => {
// //     // Trainer dashboard code
// //     res.send("Welcome to the Trainer Dashboard");
// //   }
// // );

// // app.get(
// //   "/business-dashboard",
// //   authenticateJWT,
// //   authorizeRole(["company"]),
// //   (req, res) => {
// //     // Business dashboard code
// //     res.send("Welcome to the Business Dashboard");
// //   }
// // );

// // app.get("/trainers", async (req, res) => {
// //   try {
// //     const trainers = await Trainer.find();
// //     res.status(200).json(trainers);
// //   } catch (error) {
// //     console.error("Error fetching trainers:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// // app.get("/companies", async (req, res) => {
// //   try {
// //     const companies = await Company.find();
// //     res.status(200).json(companies);
// //   } catch (error) {
// //     console.error("Error fetching companies:", error);
// //     res.status(500).json({ message: "Internal server error" });
// //   }
// // });


// // // Business request for trainer
// // app.post('/businessrequest', authenticateJWT, authorizeRole(['company']), async (req, res) => {
// //   try {
// //     // Extract the company's uniqueId from the authenticated user
// //     const companyUniqueId = req.user.uniqueId;

// //     // Ensure that the authenticated user is a company and has a uniqueId
// //     if (!companyUniqueId) {
// //       return res.status(400).json({ error: 'Company uniqueId is required.' });
// //     }

// //     // Create a new business request with the company's uniqueId
// //     const newBusinessRequest = await BusinessRequest.create({
// //       ...req.body,
// //       uniqueId: companyUniqueId,
// //     });

// //     console.log('Business Request Data inserted successfully:', newBusinessRequest);

// //     return res.status(200).json({ message: 'Business Request Data submitted successfully' });
// //   } catch (error) {
// //     console.error('Error inserting data into MongoDB:', error);
// //     return res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });


// // //business request for trainer 
// // // app.post('/businessrequest', async (req, res) => {
// // //   const businessRequestData = req.body;
  
// // //   console.log('Received Business Request Data:', businessRequestData);

// // //   try {
// // //     // Insert data into MongoDB
// // //     const newBusinessRequest = await BusinessRequest.create(businessRequestData);
// // //     console.log('Business Request Data inserted successfully:', newBusinessRequest);
// // //     return res.status(200).json({ message: 'Business Request Data submitted successfully' });
// // //   } catch (error) {
// // //     console.error('Error inserting data into MongoDB:', error);
// // //     return res.status(500).json({ error: 'Internal Server Error' });
// // //   }
// // // });

// // // Business request for trainer
// // app.post('/businessrequest', authenticateJWT, async (req, res) => {
// //   try {
// //     // Extract the company's uniqueId from the authenticated user
// //     const companyUniqueId = req.user.uniqueId;
    

// //     // Ensure that the authenticated user is a company and has a uniqueId
// //     if (!companyUniqueId) {
// //       return res.status(400).json({ error: 'Company uniqueId is required.' });
// //     }

// //     // Create a new business request with the company's uniqueId
// //     const newBusinessRequest = await BusinessRequest.create({
// //       ...req.body,
// //       uniqueId: companyUniqueId,
// //     });

// //     console.log('Business Request Data inserted successfully:', newBusinessRequest);

// //     return res.status(200).json({ message: 'Business Request Data submitted successfully' });
// //   } catch (error) {
// //     console.error('Error inserting data into MongoDB:', error);
// //     return res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });

// // // Endpoint to submit feedback form
// // app.post("/feedback", async (req, res) => {
// //   const feedbackData = req.body;
 
// //   try {
// //     const newFeedback = new Feedback(feedbackData);
// //     await newFeedback.save();
 
// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ success: false, error: "Internal Server Error" });
// //   }
// // });



// // app.listen(PORT, () => {
// //   console.log(`Server is running on port http://localhost:${PORT}`);
// // });



// ////
 
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const secretKey = "yourSecretKey";
// const bodyParser = require('body-parser');
 
// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(bodyParser.json());
 
// const uri = "mongodb+srv://avinash:avinash@cluster0.rlhitli.mongodb.net/";
 
// // Connect to MongoDB Atlas
// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "registration_db", // Specify the database name
//   })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
 
// // Define Trainer schema
// const trainerSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   contactNumber: { type: String, required: true },
//   skills: { type: String, required: true },
//   address: { type: String, required: true },
//   chargePerDay: { type: String, required: true },
//   role: { type: String, default: "trainer" },
// });
 
// // Define Company schema
// const companySchema = new mongoose.Schema({
//   uniqueId: { type: String, required: true },
//   companyName: { type: String, required: true },
//   location: { type: String, required: true },
//   phone: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   domain: { type: String, required: true },
//   role: { type: String, default: "company" },
// });
 
// // Business request for trainer
// const businessRequestSchema = new mongoose.Schema({
//   uniqueId: String, // Add a reference to the uniqueId of the company
//   batchName: String,
//   technology: String,
//   numberOfTrainees: Number,
//   durationOfTraining: Number,
//   startDate: Date,
//   endDate: Date,
//   trainingBudget: Number,
// });
 
// // Define the feedback schema
// const feedbackSchema = new mongoose.Schema({
//   company_id: String,
//   trainer_name: String,
//   trainer_id: String,
//   stars: Number,
//   feedback_description: String,
// });
 
// const Feedback = mongoose.model("Feedback", feedbackSchema);
// const Trainer = mongoose.model("Trainer", trainerSchema);
// const Company = mongoose.model("Company", companySchema);
// const BusinessRequest = mongoose.model('BusinessRequest', businessRequestSchema);
 
 
// app.use(cors());
// app.use(express.json());
 
// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;
 
//   if (authHeader) {
//     const token = authHeader.split(" ")[1]; // Bearer <token>
 
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         console.error("JWT Verification Error:", err); // Log verification errors
//         return res.sendStatus(403); // Forbidden
//       }
 
//       console.log("Decoded Token:", user); // Log decoded user information
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// };
 
// const authorizeRole = (roles) => (req, res, next) => {
//   if (roles.includes(req.user.role)) {
//     next();
//   } else {
//     res.sendStatus(403); // Forbidden
//   }
// };
 
// // Trainer registration endpoint
// app.post("/trainers", async (req, res) => {
//   try {
//     const {
//       username,
//       password,
//       name,
//       email,
//       contactNumber,
//       skills,
//       address,
//       chargePerDay,
//     } = req.body;
 
//     const hashedPassword = await bcrypt.hash(password, 10);
 
//     const newTrainer = new Trainer({
//       username,
//       password: hashedPassword,
//       name,
//       email,
//       contactNumber,
//       skills,
//       address,
//       chargePerDay,
//     });
 
//     await newTrainer.save();
//     res.status(201).json({ message: "Trainer registered successfully" });
//   } catch (error) {
//     console.error("Error registering trainer:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
 
// // Company registration endpoint
// app.post("/companies", async (req, res) => {
//   try {
//     const { email } = req.body;
 
//     // Check if email already exists
//     const existingCompany = await Company.findOne({ email });
//     if (existingCompany) {
//       return res.status(400).json({ message: "Email already exists" });
//     }
 
//     // If email doesn't exist, proceed with registration
//     const { uniqueId, companyName, location, phone, password, domain } =
//       req.body;
 
//     const hashedPassword = await bcrypt.hash(password, 10);
 
//     const newCompany = new Company({
//       uniqueId,
//       companyName,
//       location,
//       phone,
//       email,
//       password: hashedPassword,
//       domain,
//     });
 
//     await newCompany.save();
//     res.status(201).json({ message: "Company registered successfully" });
//   } catch (error) {
//     console.error("Error registering company:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
 
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
 
//   try {
//     // Check if the provided credentials are for the admin
//     if (email == "admin@gmail.com" && password == "admin") {
//       // Generate token for admin as well
//       const token = jwt.sign({ email, role: "admin" }, secretKey, {
//         expiresIn: "1h",
//       });
//       return res.status(200).json({ role: "admin", token }); // Return admin role and token
//     }
 
//     // Proceed with regular user login for trainer or company
//     let user = await Trainer.findOne({ email });
//     let role = "trainer";
 
//     if (!user) {
//       user = await Company.findOne({ email });
//       role = "company";
 
//       // Check if the company user has a uniqueId
//       if (!user || !user.uniqueId) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }
//     }
 
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (isPasswordValid) {
//       // Generate token with additional uniqueId for company users
//       const tokenPayload = { email: user.email, role };
//       if (role === "company") {
//         tokenPayload.uniqueId = user.uniqueId;
//       }
 
//       const token = jwt.sign(tokenPayload, secretKey, {
//         expiresIn: "1h",
//       });
 
//       res.status(200).json({ role, token }); // Send the token to the client
//     } else {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
 
 
// // Modify the admin-dashboard route to apply authentication middleware
// app.get(
//   "/admin-dashboard",
//   authenticateJWT, // Apply authentication middleware
//   authorizeRole(["admin"]), // Apply authorization middleware
//   (req, res) => {
//     // Admin dashboard code
//     res.send("Welcome to the Admin Dashboard");
//   }
// );
 
// app.get(
//   "/trainer-dashboard",
//   authenticateJWT,
//   authorizeRole(["trainer"]),
//   (req, res) => {
//     // Trainer dashboard code
//     res.send("Welcome to the Trainer Dashboard");
//   }
// );
 
// app.get(
//   "/business-dashboard",
//   authenticateJWT,
//   authorizeRole(["company"]),
//   (req, res) => {
//     // Business dashboard code
//     res.send("Welcome to the Business Dashboard");
//   }
// );
 
// app.get("/trainers", async (req, res) => {
//   try {
//     const trainers = await Trainer.find();
//     res.status(200).json(trainers);
//   } catch (error) {
//     console.error("Error fetching trainers:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
 
// app.get("/companies", async (req, res) => {
//   try {
//     const companies = await Company.find();
//     res.status(200).json(companies);
//   } catch (error) {
//     console.error("Error fetching companies:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
 
 
// // Business request for trainer
// // app.post('/businessrequest', authenticateJWT, authorizeRole(["company"]), async (req, res) => {
// //   try {
// //     // Extract the company's uniqueId from the authenticated user
// //     const companyUniqueId = req.user.uniqueId;
 
// //     // Ensure that the authenticated user is a company and has a uniqueId
// //     if (!companyUniqueId) {
// //       return res.status(400).json({ error: 'Company uniqueId is required.' });
// //     }
 
// //     // Create a new business request with the company's uniqueId
// //     const newBusinessRequest = await BusinessRequest.create({
// //       ...req.body,
// //       uniqueId: companyUniqueId,
// //     });
 
// //     console.log('Business Request Data inserted successfully:', newBusinessRequest);
 
// //     return res.status(200).json({ message: 'Business Request Data submitted successfully' });
// //   } catch (error) {
// //     console.error('Error inserting data into MongoDB:', error);
// //     return res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });
 
 
// //business request for trainer
// // app.post('/businessrequest', async (req, res) => {
// //   const businessRequestData = req.body;
 
// //   console.log('Received Business Request Data:', businessRequestData);
 
// //   try {
// //     // Insert data into MongoDB
// //     const newBusinessRequest = await BusinessRequest.create(businessRequestData);
// //     console.log('Business Request Data inserted successfully:', newBusinessRequest);
// //     return res.status(200).json({ message: 'Business Request Data submitted successfully' });
// //   } catch (error) {
// //     console.error('Error inserting data into MongoDB:', error);
// //     return res.status(500).json({ error: 'Internal Server Error' });
// //   }
// // });
 
// // Business request for trainer
// app.post('/businessrequest', authenticateJWT, async (req, res) => {
//   try {
//     // Extract the company's uniqueId from the authenticated user
//     const companyUniqueId = req.user.uniqueId;
   
 
//     // Ensure that the authenticated user is a company and has a uniqueId
//     if (!companyUniqueId) {
//       return res.status(400).json({ error: 'Company uniqueId is required.' });
//     }
 
//     // Create a new business request with the company's uniqueId
//     const newBusinessRequest = await BusinessRequest.create({
//       ...req.body,
//       uniqueId: companyUniqueId,
//     });
 
//     console.log('Business Request Data inserted successfully:', newBusinessRequest);
 
//     return res.status(200).json({ message: 'Business Request Data submitted successfully' });
//   } catch (error) {
//     console.error('Error inserting data into MongoDB:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
 
// // Endpoint to submit feedback form
// app.post("/feedback", async (req, res) => {
//   const feedbackData = req.body;
 
//   try {
//     const newFeedback = new Feedback(feedbackData);
//     await newFeedback.save();
 
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });
 
 
 
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });


// MAIN COMPONENTS- login.js
 
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey";
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
 
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());
 
const uri = "mongodb+srv://avinash:avinash@cluster0.rlhitli.mongodb.net/";
 
// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "registration_db", // Specify the database name
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
 
// Define Trainer schema
const trainerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  skills: { type: String, required: true },
  address: { type: String, required: true },
  chargePerDay: { type: String, required: true },
  role: { type: String, default: "trainer" },
});
 
// Define Company schema
const companySchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  domain: { type: String, required: true },
  role: { type: String, default: "company" },
});
 
const businessRequestSchema = new mongoose.Schema({
  uniqueId: { type: mongoose.Schema.Types.ObjectId, ref: 'comapnies', required: true },
  batchName: { type: String, required: true },
  technology: { type: String, required: true },
  numberOfTrainees: { type: Number, required: true },
  durationOfTraining: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  trainingBudget: { type: Number, required: true }
});
 
// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  company_id: String,
  trainer_name: String,
  trainer_id: String,
  stars: Number,
  feedback_description: String,
});
 
const Feedback = mongoose.model("Feedback", feedbackSchema);
const Trainer = mongoose.model("Trainer", trainerSchema);
const Company = mongoose.model("Company", companySchema);
const BusinessRequest = mongoose.model('BusinessRequest', businessRequestSchema);
 
 
app.use(cors());
app.use(express.json());
 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
 
  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
 
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log verification errors
        return res.sendStatus(403); // Forbidden
      }
 
      console.log("Decoded Token:", user); // Log decoded user information
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
 
const authorizeRole = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};
 
// Trainer registration endpoint
app.post("/trainers", async (req, res) => {
  try {
    const {
      username,
      password,
      name,
      email,
      contactNumber,
      skills,
      address,
      chargePerDay,
    } = req.body;
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newTrainer = new Trainer({
      username,
      password: hashedPassword,
      name,
      email,
      contactNumber,
      skills,
      address,
      chargePerDay,
    });
 
    await newTrainer.save();
    res.status(201).json({ message: "Trainer registered successfully" });
  } catch (error) {
    console.error("Error registering trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 
// Company registration endpoint
app.post("/companies", async (req, res) => {
  try {
    const { email } = req.body;
 
    // Check if email already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already exists" });
    }
 
    // If email doesn't exist, proceed with registration
    const { uniqueId, companyName, location, phone, password, domain } =
      req.body;
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newCompany = new Company({
      uniqueId,
      companyName,
      location,
      phone,
      email,
      password: hashedPassword,
      domain,
    });
 
    await newCompany.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
 
  try {
    // Check if the provided credentials are for the admin
    if (email == "admin@gmail.com" && password == "admin") {
      // Generate token for admin as well
      const token = jwt.sign({ email, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ role: "admin", token }); // Return admin role and token
    }
 
    // Proceed with regular user login for trainer or company
    let user = await Trainer.findOne({ email });
    let role = "trainer";
 
    if (!user) {
      user = await Company.findOne({ email });
      role = "company";
 
      // Check if the company user has a uniqueId
      if (!user || !user._id) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Generate token with additional uniqueId for company users
      const tokenPayload = { email: user.email, role , id : user._id};
      // if (role === "company") {
      //   tokenPayload.uniqueId = user._id;
      // }
 
      const token = jwt.sign(tokenPayload, secretKey, {
        expiresIn: "1h",
      });
 
      res.status(200).json({ role, token }); // Send the token to the client
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 
 
// Modify the admin-dashboard route to apply authentication middleware
app.get(
  "/admin-dashboard",
  authenticateJWT, // Apply authentication middleware
  authorizeRole(["admin"]), // Apply authorization middleware
  (req, res) => {
    // Admin dashboard code
    res.send("Welcome to the Admin Dashboard");
  }
);
 
app.get(
  "/trainer-dashboard",
  authenticateJWT,
  authorizeRole(["trainer"]),
  (req, res) => {
    // Trainer dashboard code
    res.send("Welcome to the Trainer Dashboard");
  }
);
 
app.get(
  "/business-dashboard",
  authenticateJWT,
  authorizeRole(["company"]),
  (req, res) => {
    // Business dashboard code
    res.send("Welcome to the Business Dashboard");
  }
);
 
app.get("/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 
app.get("/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
 
// Business request for trainer
app.post('/businessrequest', authenticateJWT, async (req, res) => {
  try {
    console.log(req);
    // Extract the company's uniqueId from the authenticated user
    const companyDocument = await Company.findById(req.user.id);
    const companyUniqueId = companyDocument._id ;
   
 
    // Ensure that the authenticated user is a company and has a uniqueId
    if (!companyUniqueId) {
      return res.status(400).json({ error: 'Company uniqueId is required.' });
    }
 
    // Create a new business request with the company's uniqueId
    const newBusinessRequest = await BusinessRequest.create({
      ...req.body,
      uniqueId: companyUniqueId,
    });
 
    console.log('Business Request Data inserted successfully:', newBusinessRequest);
 
    return res.status(200).json({ message: 'Business Request Data submitted successfully' });
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    console.log(req.uniqueId);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Find company by username endpoint
app.get("/companies/:email", async (req, res) => {
  const { email } = req.params;
  // console.log(username)
  try {
    // Find the trainer by username
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "company not found" });
    }
 
    res.status(200).json(company);
  } catch (error) {
    console.error("Error finding trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

 
// Endpoint to submit feedback form
app.post("/feedback", async (req, res) => {
  const feedbackData = req.body;
 
  try {
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
 
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
 
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

