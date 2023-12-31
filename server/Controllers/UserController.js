const User = require('../Models/UserModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

const countNewUsersInCurrentMonth = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Get the first day of the current month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the last day of the current month
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Query to count new users registered in the current month
        const totalNewUsers = await User.countDocuments({
            createdAt: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth,
            },
        });

        res.status(200).json({ totalNewUsers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// API function to count total documents in the User collection
const countUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        res.status(200).json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// get single user
const getUserById = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }
    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'No User Found'})
    }
    res.status(200).json(user)
}

// create user
const createUser = async (req, res) => {
    const {first_name, last_name, user_name, email, password, gender, user_type, address, profile, phone} = req.body
    try{
        const user = await User.create({first_name, last_name, user_name, email, password, gender, user_type, address, profile, phone})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user){
        return res.status(404).json({error: 'No User Found'})
    }
    res.status(200).json(user)
}

// user signup
const signupUser = async (req, res) => {
    const { first_name, last_name, user_name, email, password, gender, user_type, address, profile, phone } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            user_name,
            email,
            password: hashedPassword,
            gender,
            user_type,
            address,
            profile,
            phone,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // If the credentials are valid, generate a JWT token
        const token = generateToken(user._id, user.user_type);
        res.status(200).json({ message: 'Login successful', token, user_type: user.user_type });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser2 = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      if (password !== user.password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// update user
const updateUser = async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No User Found'})
    }
    const user = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
        return res.status(404).json({error: 'No User Found'})
    }
    res.status(200).json(user)
}
module.exports = {
    getUsers, 
    signupUser,
    loginUser,
    loginUser2,
    getUserById,
    countUsers,
    countNewUsersInCurrentMonth,
    createUser,
    deleteUser,
    updateUser
}