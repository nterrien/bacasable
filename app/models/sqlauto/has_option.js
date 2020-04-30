/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('has_option', {
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
    id_option: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'option',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,

    tableName: 'has_option'
  });
};
