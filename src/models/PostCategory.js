module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        categoryId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
        },

    }, {
        tableName: 'posts_categories',
        underscored: true,
        timestamps: false
    });

    PostCategory.associate = ({ BlogPost, Category }) => {
        BlogPost.belongsToMany(Category, {
            as: 'categories',
            foreignKey: 'Post_id',
            through: PostCategory,
            // otherKey: 'Category_id'
        }),
        Category.belongsToMany(BlogPost, {
            as: 'blogPost',
            foreignKey: 'Category_id',
            through: PostCategory,
            // otherKey: 'Post_id'
        })
    }

    return PostCategory;
};