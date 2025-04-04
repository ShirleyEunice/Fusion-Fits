const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({ //define the structure, types, validation for entries
  name:{
    type: String,
    required: true,
    trim: true, //to remove specified characters like whitespace
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"], //validate the email using regular expression
  },
  password:{
    type: String,
    required: true,
    minLength: 6,
  },
  role:{
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  },
  {timestamps: true} //createdAt and updatedAt. These fields are used to track when a document was created and last updated.
);

//Password Hash middleware that will hash the password before storing it in database
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Match User entered password to Hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
  if(typeof enteredPassword !== "string"){
    console.error("entered password is not a string: ", enteredPassword);
    throw new Error("Invalid password format");
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);