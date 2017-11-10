const knex = require('./knex');
const modelBase = require('./bookshelf.model');

const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin('virtuals');
bookshelf.plugin('visibility');
bookshelf.plugin('pagination');

modelBase(bookshelf);

module.exports = bookshelf;
