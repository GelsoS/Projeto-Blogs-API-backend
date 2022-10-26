module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('blog_posts', {
      id: DataTypes.INTEGER,
      display_name: DataTypes.STRING,
      image: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      tableName: 'blog_posts',
      underscored: true,
    });   

   
    return User;
  };