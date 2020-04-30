/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('is_option', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    id_article: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'article',
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

    tableName: 'is_option'
  });
};
