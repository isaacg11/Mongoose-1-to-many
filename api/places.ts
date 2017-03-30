import express = require('express');
let router = express.Router();
import Category from '../models/category';
import Place from '../models/place';


/* CREATE */
router.post('/', (req, res) => {
  let place:any = new Place();
  place.name = req.body.name;
  place.address = req.body.address;
  place.save((err, newPlace) => {
    Category.findOne({name: req.body.category}).exec((err, result:any) => {
      if (err) {
        res.send(err)
      } else {
        if(result === null) {
          let category:any = new Category();
          category.name = req.body.category;
          category.places.push(newPlace._id);
          category.save((err) => {
            if(err) {
              res.send(err)
            } else {
              res.send('success');
            }
          })
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
      }
    });
  })
})

/* READ */
router.get('/:category', (req, res) => {
  Category.findOne({name: req.params['category']}).populate('places').exec(function (err, results:any) {
    if (err) {
      res.send(err)
    } else {
      res.json(results.places)
    }
  });
})

export default router;
