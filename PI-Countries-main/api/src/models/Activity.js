const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: 'Unique identifier for the activity',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the activity',
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      season: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isIn: [['summer', 'spring', 'winter', 'autumn']],
        },
        comment: 'main season of activity',
      },
    },
    {
      timestamps: false,
    }
  );
};
