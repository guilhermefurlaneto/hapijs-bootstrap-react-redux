const _ = require('lodash');
const Promise = require('bluebird');

module.exports = (bookshelf) => {
  const sup = {
    related : bookshelf.Model.prototype.related,
  };


  bookshelf.Model = bookshelf.Model.extend({

    /**
     * Transforms a database record's field names from snake_case to camelCase
     *
     * @param  {object} attrs The record to transform
     * @return {object}
     */
    parse(attributes) {
      return _.transform(attributes, (attrs, val, key) => {
        key = _.camelCase(key);

        attrs[key] = val;

        return attrs;
      });
    },

    /**
     * Transforms the record's attributes from camelCase to snake_case
     *
     * @param  {object} attrs The attributes to transform
     * @return {object}
     */
    format(attributes) {
      return _.transform(attributes, (attrs, val, key) => {
        const _key = _.snakeCase(key);

        if (! attrs[_key]) {
          attrs[_key] = val;
        }

        return attrs;
      });
    },

    ensure(name, options) {
      let result;
      let model;

      if (_.isArray(name)) {
        result = Promise.map(name, (rel) => {
          return this.ensure(rel, options);
        });
      } else if (name.indexOf('.') === -1) {
        result = Promise.resolve(this.hasRelation(name) ? this : this.load(name, options));
      } else {
        result = Promise.mapSeries(name.split('.'), (subName) => {
          model = model || this;

          return Promise.resolve(model.hasRelation(subName) ? model : model.load(subName, options))
          .tap(() => {
            model = model.related(subName);
          });
        });
      }

      return result.return(this);
    },

    hasRelation(name) {
      return !! this.relations[name];
    },

    _related(name) {
      return sup.related.call(this, name);
    },

    related(name) {
      let relation;

      if (_.isArray(name)) {
        _.each(name, (rel) => {
          this._related(rel);
        });
      } else if (name.indexOf('.') === -1) {
        relation = this._related(name);
      } else {
        name.split('.').some((subName) => {
          relation = relation && relation.related ? relation.related(subName) :
                                                    this.related(subName);

          return ! relation;
        });
      }

      return relation;
    },

    /**
     * Transforms records in the belongsToMany relation to those
     * listen in the newIds array. Relations not listed are removed
     * and missing relations will be created. You should preload
     * relation using with_related.
     *
     * @param {string} relationName   Relation name
     * @param {array}  newValues      Array of IDs
     * @return {Promise}
     */
    setRelationValues(relationName, newValues) {
      const relation = this.related(relationName);
      const existing = relation.pluck('id');

      return Promise.all([
        relation.attach(_.difference(newValues, existing)),
        relation.detach(_.difference(existing, newValues)),
      ]).then(() => {
        return this.load(relationName);
      });
    },

  });
};
