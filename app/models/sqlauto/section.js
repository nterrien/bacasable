/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('section', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_volume: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'volume',
        key: 'id'
      }
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
    tableName: 'section'
  });
};
