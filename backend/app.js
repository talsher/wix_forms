var express = require("express");

var bodyParser = require("body-parser");
var {
  validateFieldsDuplicates,
  validateSubmission
} = require("./validation/validation");

var { Validator } = require("express-json-validator-middleware");
var validationErrorHandler = require("./errorHandlers/validationErrorHandler");

// constants
const serverErrorMsg = "Internal server error";

// set up express
var app = express();
app.use(bodyParser.json());

// set up mongo
//var mongoUrl = "mongodb://localhost:27017/wix_forms";

var Form = require("./models/form");
var Counter = require("./models/counter");

// set up validation

var validator = new Validator({ allErrors: true });
var validate = validator.validate;

function nextFormId() {
  // increace and return form id counter Promise
  return Counter.findOneAndUpdate(
    { _id: "formId" },
    { $inc: { count: 1 } },
    { new: true, useFindAndModify: false }
  );
}

// get list of all forms
app.get("/api/form/list", function(req, res) {
  Form.find({}, (err, forms) => {
    if (err) {
      console.log(err);
      res.status(500).send(serverErrorMsg);
    }

    res.status(200).json(forms);
  });
});

// scheme for /form request
var getFormScheme = {
  type: "object",
  required: ["id"],
  properties: {
    required: {
      type: "string"
    }
  }
};

// get a single form
app.get("/api/form", validate({ query: getFormScheme }), (req, res) => {
  Form.findById(req.query.id, (err, form) => {
    if (err) {
      console.log(err);
      res.status(500).send(serverErrorMsg);
    } else {
      if (!form) res.status(400).send("not found");
      else res.status(200).json(form);
    }
  });
});

var postFormScheme = {
  type: "object",
  required: ["name", "fields"],
  properties: {
    name: {
      type: "string"
    },
    fields: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["name", "type", "label"],
        properties: {
          name: {
            type: "string"
          },
          type: {
            type: "string"
          }
        }
      }
    }
  }
};
// post new form
app.post("/api/form", validate({ body: postFormScheme }), (req, res) => {
  const name = req.body.name;
  const fields = req.body.fields;

  if (!validateFieldsDuplicates(fields)) {
    res.status(400).send("form has duplicated fields");
    return;
  }

  // get next id and post the form
  nextFormId()
    .then(counter => {
      let newId = counter.count;

      let newForm = Form({
        _id: newId,
        name: name,
        numSubmissions: 0,
        formFields: fields,
        submissions: []
      });

      newForm
        .save()
        .then(form => {
          res.status(200).send("added!");
        })
        .catch(err => {
          res.status(500).send(serverErrorMsg);
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(serverErrorMsg);
    });
});

var postFormSubmitScheme = {
  type: "object",
  required: ["id", "submission"],
  properties: {
    id: {
      type: "string"
    },
    formSubmission: {
      type: "object"
    }
  }
};

// submit form
app.post(
  "/api/form/submit",
  validate({ body: postFormSubmitScheme }),
  (req, res) => {
    const formId = req.body.id;
    const formSubmission = req.body.submission;

    Form.findById(formId, (err, form) => {
      if (err) {
        res.status(500).send(serverErrorMsg);
      }
      if (!form) {
        res.status(400).send(`no such form ${formId}`);
      } else {
        let [valid, errorMsg] = validateSubmission(
          form.formFields,
          formSubmission
        );
        // validate submission with form and add it to submission list
        if (valid) {
          Form.updateOne(
            { _id: formId },
            {
              $push: { submissions: formSubmission },
              $inc: { numSubmissions: 1 }
            }
          )
            .then(form => {
              res.status(200).send("added");
            })
            .catch(err => {
              res.status(500).send(serverErrorMsg);
              console.log(err);
            });
        } else {
          res.status(400).send(`validation error: ${errorMsg}`);
        }
      }

      // TODO: add validation
    });
  }
);

var getFormSubmissionsScheme = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string"
    }
  }
};

// get all form submissions
app.get(
  "/api/form/submissions",
  validate({ query: getFormSubmissionsScheme }),
  (req, res) => {
    const formId = req.query.id;
    if (!formId) {
      res.status(400).send("Bad request: no id in query");
    }

    Form.findById(formId, (err, form) => {
      if (err) res.status(500).send(serverErrorMsg);
      else res.status(200).json(form.submissions);
    });
  }
);

// Error handler for valication errors must come last
app.use(validationErrorHandler);

module.exports = app;
