/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_city: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    id_architect: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'architect',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    tableName: 'project'
  });
};
