'use strict';
module.exports = (sequelize, DataTypes) => {
  const tagsPosts = sequelize.define('tagsPosts', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  tagsPosts.associate = function(models) {
    // associations can be defined here
  };
  return tagsPosts;
};