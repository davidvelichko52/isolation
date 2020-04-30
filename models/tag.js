'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    tagName: DataTypes.STRING
  }, {});
  tag.associate = function(models) {
    // associations can be defined here
    models.tag.belongsToMany(models.post, {
      through: models.tagsPosts,
      onDelete: 'CASCADE'
    })
  };
  return tag;
};