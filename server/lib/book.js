/* eslint max-statements: ["error", 23, { "ignoreTopLevelFunctions": true }] */

const bookshelf = require('./bookshelf');

function Book() {
  this.tableName = null;
  this.timestamps = null;
  this.registeredModel = null;
  this.registeredCollection = null;
  this.auditFields = null;
  this.modelClassProps = {};
  this.modelPrototypeProps = {};
  this.collectionPrototypeProps = {};
  this.collectionClassProps = {};
  this.hidden = [];

  this.setTable = function setTable(tableName) {
    this.tableName = tableName;
    return this;
  };

  this.setTimeStamps = function setTimeStamps(timestamps) {
    this.timestamps = timestamps;
    return this;
  };

  this.registerModel = function registerModel(model) {
    this.registeredModel = model;
    return this;
  };

  this.registerCollection = function registerCollection(collection) {
    this.registeredCollection = collection;
    return this;
  };

  this.setHidden = function setHidden(hidden) {
    this.hidden = hidden;
    return this;
  };

  this.register = function register(model, collection) {
    this.registeredModel = model;
    this.registeredCollection = collection;
    return this;
  };

  this.setModelPrototypeProps = function setModelPrototypeProps(modelPrototypeProps) {
    this.modelPrototypeProps = modelPrototypeProps;
    return this;
  };

  this.setModelClassProps = function setModelClassProps(modelClassProps) {
    this.modelClassProps = modelClassProps;
    return this;
  };

  this.setCollectionPrototypeProps = function setCollectionPrototypeProps(arg) {
    this.collectionPrototypeProps = arg;
    return this;
  };

  this.setCollectionClassProps = function setCollectionClassProps(collectionClassProps) {
    this.collectionClassProps = collectionClassProps;
    return this;
  };

  this.setAuditFields = function setAuditFields(auditFields) {
    this.auditFields = auditFields;
    return this;
  };

  this.setDefaults = function setDefaults() {
    const tableName = this.modelPrototypeProps.tableName || this.tableName;

    if (! tableName) {
      throw new Error('tableName is required to publish a new Book');
    }

    if (! this.modelPrototypeProps.tableName) {
      this.modelPrototypeProps.tableName = tableName;
    }

    if (! this.modelPrototypeProps.hasTimestamps && this.timestamps) {
      this.modelPrototypeProps.hasTimestamps = this.timestamps;
    }

    if (! this.modelPrototypeProps.auditFields && this.auditFields) {
      this.modelPrototypeProps.auditFields = this.auditFields;
    }

    if (! this.modelPrototypeProps.hidden && this.hidden) {
      this.modelPrototypeProps.hidden = this.hidden;
    }

    if (this.registeredModel) {
      this.modelPrototypeProps.modelName = this.registeredModel;
    }
  };

  this.publish = function publish() {
    this.setDefaults();

    const model = bookshelf.Model.extend(this.modelPrototypeProps, this.modelClassProps);

    this.collectionPrototypeProps.model = model;

    const collection = bookshelf.Collection.extend(
      this.collectionPrototypeProps,
      this.collectionClassProps
    );

    if (this.registeredModel) {
      bookshelf.model(this.registeredModel, model);
    }

    if (this.registerCollection) {
      bookshelf.collection(this.registeredCollection, collection);
    }

    return {
      Model : model,
      Collection : collection,
    };
  };
}

module.exports = Book;
