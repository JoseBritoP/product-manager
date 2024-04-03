import { Sequelize,DataTypes, UUIDV4 } from "sequelize";

export default (sequelize:Sequelize) => {
  sequelize.define('Product',{
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:UUIDV4
    },
    name:{
      type:DataTypes.STRING(100),
      allowNull:false,
      unique:false
    },
    price:{
      type:DataTypes.FLOAT,
      defaultValue:0,
    },
    inStock:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    deleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  })
}