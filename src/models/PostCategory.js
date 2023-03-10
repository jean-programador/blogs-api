const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      categoryId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    },
  );
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};

module.exports = PostCategoryModel;
