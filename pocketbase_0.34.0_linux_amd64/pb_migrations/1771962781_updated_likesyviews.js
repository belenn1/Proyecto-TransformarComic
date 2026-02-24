/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2349397342")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number300981383",
    "max": null,
    "min": null,
    "name": "views",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2349397342")

  // remove field
  collection.fields.removeById("number300981383")

  return app.save(collection)
})
