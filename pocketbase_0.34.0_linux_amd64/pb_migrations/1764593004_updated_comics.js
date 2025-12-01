/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_440763926")

  // add field
  collection.fields.addAt(3, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url3739236313",
    "name": "url_base",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "url4029323933",
    "name": "url_pagina",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // update field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2829588044",
    "max": 0,
    "min": 0,
    "name": "tituloComic",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1430962065",
    "max": 0,
    "min": 0,
    "name": "autorcomic",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_440763926")

  // remove field
  collection.fields.removeById("url3739236313")

  // remove field
  collection.fields.removeById("url4029323933")

  // update field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2829588044",
    "max": 0,
    "min": 0,
    "name": "titulo_comic",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1430962065",
    "max": 0,
    "min": 0,
    "name": "autor_comic",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
