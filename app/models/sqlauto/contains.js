/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contains', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_quote: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'quote',
        key: 'id'
      }
    },
    id_article: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'article',
        key: 'id'
      }
    },
    id_submit: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'submit_group',
        key: 'id'
      }
    },
    id_market_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'market_type',
        key: 'id'
      }
    },
    risk_factor: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    freezeTableName: true,

    tableName: 'contains'
  });
};
