'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    models.post.belongsToMany(models.tag, {
      through: models.tagsPosts,
      onDelete: 'CASCADE'
    })
  };
  return post;
};