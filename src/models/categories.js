module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('categorie', {
      name: DataTypes.STRING,
    }, {
      underscored: true,
    });   
    return categories;
  };