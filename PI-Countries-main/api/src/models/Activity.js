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
      typeActivity: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Type of the activity',
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['1', '2', '3', '4','5']],
        },
      },
      season: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Summer', 'Spring', 'Winter', 'Autumn']],
        },
        comment: 'main season of activity',
      },
    },
    {
      timestamps: false,
    }
  );
};
