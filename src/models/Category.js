module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('Category', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    }, {
      underscored: true,
      timestamps: false
    });   
    return categories;
  };