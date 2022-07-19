const  mongoose= require ('mongoose');
const {isEmail}= require("validator")

const ClientSchema= new  mongoose.Schema({
    Prenom :{
        type : String,
        required : true,
        trim:true
    },
    Nom : {
        type : String,
        require: true,
        trim:true
    },
    Telephone: {
        type: String,
        require: true
    },
    Adresse: {
        type: String,
        require: true
    },
    EmailClient: {
        type: String,
        require: true,
        unique: true,
        validate: [isEmail],
        trim:true

    }
},
{
    timestamps:true,
}
)
module.exports= mongoose.model("client", ClientSchema);