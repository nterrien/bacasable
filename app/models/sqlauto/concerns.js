/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('concerns', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_project: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'project',
        key: 'id'
      }
    },
    id_customer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'customer',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'concerns'
  });
};
