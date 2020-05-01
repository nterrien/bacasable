/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('option', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_item: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    id_submit: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'submit_group',
        key: 'id'
      }
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    unit: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    minimal_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    percent_workforce: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    subcontractable: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    up_to_date: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1',
      references: {
        model: 'status',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'option'
  });
};
