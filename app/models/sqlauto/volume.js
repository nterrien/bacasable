/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('volume', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    tableName: 'volume'
  });
};
