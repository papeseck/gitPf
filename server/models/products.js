const mongoose= require ('mongoose');
const ProductSchema = new  mongoose.Schema ({
    Description: {
       type : String,
       require: true,    
    },
    Poids : {
        type: String,
        require: true,
    },
    Prix: {
        type: String,
        require: true
    }, 
    Image :{
        type: Object,
        require: true
    },
    Name :{
        type: String,
        require: true
    }
   
},
{
    timestamps:true,
}
)
module.exports= mongoose.model("product", ProductSchema)