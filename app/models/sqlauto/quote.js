/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('quote', {
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
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    hours_management: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    date_creation: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    signed: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    date_signature: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,

    tableName: 'quote'
  });
};
