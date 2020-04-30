/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name_city: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    zip_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,

    tableName: 'city'
  });
};
