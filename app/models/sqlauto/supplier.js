/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('supplier', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_city: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    name_company: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    type_business: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    mail: {
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
    tableName: 'supplier'
  });
};
