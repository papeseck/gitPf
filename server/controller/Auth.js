const Avi = require("../models/Avi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const createToken = (id, pseudo) => {
    return jwt.sign({
        data: { id, pseudo }
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}


module.exports.signUp = async (request, response) => {
    const { pseudo, email, password } = request.body;
    const salt = bcrypt.genSaltSync(10);
    const cryptPassword = bcrypt.hashSync(password, salt);
   
        const avi = await Avi.create({
            pseudo,
            email,
            password: cryptPassword,
            salt
        })
    
    const token = createToken(avi._id, avi.pseudo)
    return response.status(201).json({
        message: "Aviculteur created successfully",
        token
    })
}

module.exports.signIn = async (request, response) => {
    const { email, password } = request.body;
    const aviExist = await Avi.findOne({email});
    if (!aviExist) {
        return response.status(401).json({
            message: `Aviculteur with this address email ${email} does not exist!`
        })
    }
    const comparePassword = bcrypt.compareSync(password, aviExist[0].password);
    if (!comparePassword) {
        return response.status(401).json({
            message: "Mot de passe incorrect!"
        })
    }
    const token = createToken(aviExist._id, aviExist.pseudo)
    return response.status(201).json({
        message: "connected",
        token
    })
}