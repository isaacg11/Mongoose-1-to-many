import express = require('express');
let router = express.Router();
import Category from '../models/category';
import Place from '../models/place';


/* CREATE */
router.post('/', (req, res) => {
  let place:any = new Place();
  place.name = 'Disney Land';
  place.address = 'Los Angeles, CA';
  place.save((err, newPlace) => {
    Category.findOne({ name:'food'}).exec((err, result:any) => {
      if (err) {
        res.send(err)
      } else {
        if(result === null) {
          let category:any = new Category();
          category.name = 'food';
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
router.get('/', (req, res) => {
  Category.findOne({name: 'food'}).populate('places').exec(function (err, results) {
    if (err) {
      res.send(err)
    } else {
      res.send(results)
    }
  });
})

export default router;
