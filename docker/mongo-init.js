db.createCollection("counters");
db.createCollection("forms");

db.counters.insert({ _id: "formId", count: 0 });
