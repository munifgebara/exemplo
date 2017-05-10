(function () {
  'use strict';
  function GumgaController(Service) {
    let self = this;
    this.and = this;
    this.data = [];
    this.pageSize = 10;
    this.count = 0;
    this.records = []
    this.methods = {
      getRecords() {
        return self.records;
      },
      asyncSearch(field, param) {
        return Service
          .getSearch(field, param)
          .then(function (data) {
            return data.data.values;
          });
      },
      asyncPost(value, param) {
        self.emit('asyncPostStart');
        return Service.save(value);
      },
      get(page = 1) {
        self.emit('getStart');
        Service
          .get(page)
          .then((data) => {
            self.emit('getSuccess', data.data);
            self.data = data.data.values;
            self.pageSize = data.data.pageSize;
            self.count = data.data.count;
            self.data.map(record => self.records.push(record.id))
          }, (err) => { self.emit('getError', err); })
        return self;
      },
      getId(id = 0) {
        self.emit('getIdStart');
        Service
          .getById(id)
          .then((data) => {
            self.emit('getIdSuccess', data.data);
            self.data = data.data;
            if (self.pageSize) delete self.pageSize;
            if (self.count) delete self.count
          }, (err) => { self.emit('getIdError', err); })
        return self;
      },
      getNew() {
        self.emit('getNewStart');
        Service
          .getNew()
          .then((data) => {
            self.emit('getNewSuccess', data.data);
            self.data = data.data;
            if (self.pageSize) delete self.pageSize;
            if (self.count) delete self.count
          }, (err) => { self.emit('getNewError', err); })
        return self;
      },
      put(value) {
        self.emit('putStart');
        Service
          .update(value)
          .then(function (data) {
            self.emit('putSuccess', data);
          }, (err) => { self.emit('putError', err); })
        return self;
      },
      post(value) {
        self.emit('postStart');
        Service
          .save(value)
          .then((data) => {
            self.emit('postSuccess', data);
          }, (err) => { self.emit('postError', err); })
        return self;
      },
      delete(array) {
        self.emit('deleteStart');
        Service
          .deleteCollection(array)
          .then((data) => {
            self.emit('deleteSuccess', data);
          }, (err) => { self.emit('deleteError', err); })
        return self;
      },
      sort(field, way) {
        self.emit('sortStart');
        Service
          .sort(field, way)
          .then((data) => {
            self.emit('sortSuccess', data.data);
            self.data = data.data.values;
            self.pageSize = data.data.pageSize;
            self.count = data.data.count;
          }, (err) => { self.emit('sortError', err); })
        return self;
      },
      search(field, param) {
        self.emit('searchStart');
        Service
          .getSearch(field, param)
          .then((data) => {
            self.emit('searchSuccess', data.data);
            self.data = data.data.values;
            self.pageSize = data.data.pageSize;
            self.count = data.data.count;
          }, (err) => { self.emit('searchError', err); })
        return self;
      },
      advancedSearch(param) {
        self.emit('advancedSearchStart');
        Service
          .getAdvancedSearch(param)
          .then((data) => {
            self.emit('advancedSearchSuccess', data.data);
            self.data = data.data.values;
            self.pageSize = data.data.pageSize;
            self.count = data.data.count;
          }, (err) => { self.emit('advancedSearchError', err); })
        return self;
      },
      redoSearch() {
        self.emit('redoSearchStart');
        Service
          .redoSearch()
          .then((data) => {
            self.emit('redoSearchSuccess', data.data);
            self.data = data.data.values;
            self.pageSize = data.data.pageSize;
            self.count = data.data.count;
          }, (err) => { self.emit('redoSearchError', err); })
        return self;
      },
      postQuery(query, name) {
        self.emit('postQueryStart');
        Service.saveQuery({ query: query, name: name })
          .then((data) => {
            self.emit('postQuerySuccess');
          }, (err) => { self.emit('postQueryError', err); })
        return self;
      },
      getQuery(page) {
        self.emit('getQueryStart');
        return Service
          .getQuery(page)
          .then((data) => {
            self.emit('getQuerySuccess', data.data);
            return data.data.values;
          }, (err) => { self.emit('getQueryError', err); })
      },
      postImage(attribute, model) {
        self.emit('postImageStart');
        return Service
          .saveImage(attribute, model)
          .then((data) => {
            self.emit('postImageSuccess');
            return data;
          }, (err) => { self.emit('postImageError', err); })
      },
      deleteImage(attribute, model) {
        self.emit('deleteImageStart');
        Service.deleteImage(attribute, model)
          .then((data) => {
            self.emit('deleteImageSuccess');
          }, (err) => { self.emit('deleteImageError', err); })
        return self;
      },
      reset() {
        self.emit('resetStart');
        Service.resetDefaultState();
        return self;
      },
      getAvailableTags() {
        self.emit('getAvailableTagsStart');
        return Service.getAvailableTags();
      },
      getSelectedTags(id) {
        self.emit('getSelectedTagsStart');
        return Service.getSelectedTags(id);
      },
      postTags(id, values) {
        self.emit('postTagStart', values);
        Service.postTags(id, values)
          .then(data => {
            self.emit('postTagSuccess', values);
          }, err => {
            self.emit('postTagError', values);
          })
      },
      getDocumentationURL() {
        self.emit('getDocumentationURLStart')
        return Service.getDocumentationURL()
      }
    };
  }

  GumgaController.prototype.callbacks = {};

  GumgaController.prototype.and = this;

  GumgaController.prototype.emit = function (ev, data) {
    if (this.callbacks[ev]) {
      this.callbacks[ev].forEach((cb) => {
        cb(data);
      });
    }
    return this;
  }

  GumgaController.prototype.on = function (ev, cb) {
    if (!this.callbacks[ev]) {
      this.callbacks[ev] = [];
    }
    this.callbacks[ev].push(cb);
    return this;
  }

  GumgaController.prototype.execute = function (nameOfTheFunction = {}, ...args) {
    if (nameOfTheFunction.constructor !== String) throw 'O primeiro parâmetro deve ser uma string!';
    if (this.methods[nameOfTheFunction]) {
      this.methods[nameOfTheFunction](...args);
      return this;
    }
    throw 'O nome do método está errado! Por favor coloque um método que está no GumgaController';
  }


  // -------------------------------------------------------- Componente

  GumgaCtrl.$inject = [];

  function GumgaCtrl() {

    function createRestMethods(container, service, identifierOrConfiguration) {
      let idConstructor = identifierOrConfiguration.constructor;
      if (!container) throw 'É necessário passar um objeto no primeiro parâmetro';
      if (!service) throw 'É necessário passar um objeto no segundo parâmetro';
      if (idConstructor !== Object && idConstructor !== String) throw 'É necessário passar um objeto ou uma string no terceiro parâmetro';
      const options = this._createOptions(identifierOrConfiguration);
      if (!!options.noScope) return new GumgaController(service);
      container[options.identifier] = new GumgaController(service);
      return;
    }

    function _createOptions(identifier = {}) {
      if (identifier.constructor === String) {
        return {
          identifier,
          noScope: false
        }
      }
      let object = angular.extend({}, identifier);
      object.noScope = !!object.noScope;
      if (!object.identifier) {
        throw 'Você precisa passar um identificador para o objeto de configuração do createRestMethods!';
      }
      return object;
    }

    return {
      createRestMethods,
      _createOptions
    };
  }

  angular.module('gumga.controller', [])
    .factory('gumgaController', GumgaCtrl);
})();
