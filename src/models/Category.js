module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('Category', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    }, {
      tableName: 'categories',
      underscored: true,
      timestamps: false
    });   
    return categories;
  };