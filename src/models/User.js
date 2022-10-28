module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false
  });

  User.associate = (models)=>{
    User.hasMany(models.BlogPost, {
      as:'Blog_Post',
      foreignKey: 'blog_id'
    })
  }
  
  return User;
};