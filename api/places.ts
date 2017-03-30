import express = require('express');
let router = express.Router();
import Category from '../models/category';
import Place from '../models/place';


/* CREATE or UPDATE */
router.post('/', (req, res) => {
  if(req.body._id) {
    Place.findByIdAndUpdate(req.body._id, { "$set": { "name": req.body.name, "address": req.body.address }}, { "new": true, "upsert": true },
      function (err, updatedCategory) {
        if (err) {
          res.send(err)
        } else {
          res.send(updatedCategory);
        }
      }
    );
  } else {
    let place:any = new Place();
    place.name = req.body.name;
    place.address = req.body.address;
    place.save((err, newPlace) => {
      Category.findOne({name: req.body.category}).exec((err, result:any) => {
        if (err) {
          res.send(err)
        } else {
          Category.findByIdAndUpdate(result._id, { "$push": { "places": newPlace._id }}, { "new": true, "upsert": true },
            function (err, updatedCategory) {
              if (err) {
                res.send(err)
              } else {
                res.send(updatedCategory);
              }
            }
          );
        }
      });
    })
  }
})

/* READ */
router.get('/:tag', (req, res) => {
  Category.findOne({name: req.params['tag']}).populate('places').exec(function (err, results:any) {
    if (err) {
      res.send(err)
    } else {
      res.json(results.places)
    }
  });
})

/* DELETE */
router.delete('/:tag', (req, res) => {
  Place.remove({_id: req.params['tag']}, (err) => {
    if(err) {
      res.send(err)
    } else {
      res.send('success');
    }
  })
})

export default router;
