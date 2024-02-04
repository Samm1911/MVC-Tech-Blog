const User = require('./User');
const Blog = require('./BlogPost');
const Comment = require('./Comment');

// create relations between the models
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
   foreignKey: 'blog_id',
   onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog, Comment};