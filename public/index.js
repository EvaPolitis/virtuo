'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];



//All Steps
for (var i in rentals){
  for(var j in cars){
    if( rentals[i].carId==cars[j].id)
    {
      //Step1
      var reduc=1;
      var distance_component = rentals[i].distance * cars[j].pricePerKm;

      var pickupday =new Date(rentals[i].pickupDate) ;
      var returnday=new Date(rentals[i].returnDate);
      var time_diff=returnday.getTime()-pickupday.getTime();
      var days = time_diff / (1000 * 3600 * 24)+1; 

      //Step 2
      if(days>1&&days<=4) {reduc=0.90;}
      if(days>4&&days<=10) {reduc=0.70;}
      if(days>10) {reduc=0.50;}

      var time_component= days * cars[j].pricePerDay; 
      
      rentals[i].price = (distance_component+time_component)*reduc;
    }
  }

  //Step 3
  var commission= rentals[i].price *0.3;
  rentals[i].commission.insurance=commission*0.5;
  rentals[i].commission.treasury = days;
  rentals[i].commission.virtuo= rentals[i].price-rentals[i].commission.treasury-rentals[i].commission.insurance;


  //Step 4
  if(rentals[i].options.deductibleReduction==true){
    rentals[i].price+=4*days;
    rentals[i].commission.virtuo += 4*days;
  }

  //Step 5
  for(var j in actors){
    if( rentals[i].carId==actors[j].rentalId){
      for(var l=0;l<actors[j].payment.length;l++) //iterate through payment list
        {            
            if(actors[j].payment[l].who == 'driver')
            {
              actors[j].payment[l].amount=rentals[i];
            }
           
        }
      
     // actors[j].commission
    }
  }

    /*

// Question 5

actors.forEach(function(itemactors,indexactors,arrayactors){
  var ind;
  rentals.forEach(function(itemrentals,indexrentals,arrayrentals){
    if(itemrentals.id==itemactors.rentalId)
    {
      ind = indexrentals;
    }
  })
  itemactors.payment.forEach(function(itemactorspayment,indexactorspayment,arrayactorspayments){
    var tot_com;
    if (itemactorspayment.who=='driver')
    {
      itemactorspayment.amount=rentals[ind].price;
    }
    else if(itemactorspayment.who=='partner')
    {
      tot_com = rentals[ind].commission.insurance+rentals[ind].commission.treasury+rentals[ind].commission.virtuo;
      itemactorspayment.amount=rentals[ind].price-tot_com;
    }
    else if (itemactorspayment.who=='insurance')
    {
      itemactorspayment.amount=rentals[ind].commission.insurance;
    }
    else if (itemactorspayment.who=='treasury')
    {
      itemactorspayment.amount=rentals[ind].commission.treasury;
    }
    else if (itemactorspayment.who=='virtuo')
    {
      itemactorspayment.amount=rentals[ind].commission.virtuo;
    }
  })
})

console.log(actors);
console.log(rentals);
*/

//console.log(cars);
console.log(rentals);
console.log(actors);
}