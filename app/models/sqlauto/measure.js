/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('measure', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_contains: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'contains',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,

    tableName: 'measure'
  });
};
