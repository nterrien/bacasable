/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('market_type', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    acronym: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    tableName: 'market_type'
  });
};
