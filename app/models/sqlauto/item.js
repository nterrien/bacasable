/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_section: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'section',
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
    underscored: true,
    freezeTableName: true,

    tableName: 'item'
  });
};
