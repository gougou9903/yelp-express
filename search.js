var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword


        // TODO: lookup restaurants whose names contain the given keyword
        
        //var rs = [restaurants[6], restaurants[10]] // hardcoded for 'Pizza'
        var rs = _.filter(restaurants,function(chr){
            if(chr.name.indexOf(keyword) == -1)
                return false
            else
                return true

        });
        
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        var rs = _.filter(restaurants, function(chr){
            for(var i in chr.attributes){
                if(i == "Good For"){
                    
                    for(var j in chr.attributes[i]){
                        if(j == x){
                            
                            return chr.attributes[i][j]}
                    }
                }
            }
            return false
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        var rs = _.filter(restaurants, function(chr){
            for(var i in chr.attributes){
                if(i == "Ambience"){
                    
                    for(var j in chr.attributes[i]){
                        if(j == x){
                            
                            return chr.attributes[i][j]}
                    }
                }
            }
            return false
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        console.log(x)
        if(x == "Fast-Food")
            var y = "Fast Food"
        else
            var y = x


        // TODO: lookup restaurants belonging to category :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        var rs = _.filter(restaurants, function(chr){
            for(var i = 0; i < chr.categories.length; i++){
                console.log(chr.categories[i])
                if( chr.categories[i] == y)
                    return true
                
            }
            return false
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        var rs = _.filter(restaurants, function(chr){
            if(relationship == "above")
                return (chr.stars >= number)
            else if(relationship == "below")
                return (chr.stars <= number)
        })
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        
        console.log('req.query: ', req.query)
        console.log('minStars', minStars)    
        
        // // TODO: lookup restaurants with the given query parameters
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
        var rs = _.filter(restaurants, function(chr){
            var token = [true, true, true, true]

            if(name != undefined){
                if(chr.name.indexOf(name) == -1)
                    token[0] = false
                else
                    token[0] = true
            }

            if(minStars != undefined){
                if(chr.stars < minStars)
                    token[1] = false
            }

            if(category != undefined){
                var find = false
                for(var i = 0; i < chr.categories.length; i ++){
                    if(chr.categories[i] == category)
                        find = true
                }

                if(find == false) token[2] = false;
            }

            if(ambience != undefined){
                var find = [false, false]
                for(var i in chr.attributes){
                if(i == "Ambience"){
                    find[0] = true;
                    for(var j in chr.attributes[i]){
                        if(j == ambience){
                            find[1] = true
                            token[3] = chr.attributes[i][j]
                        }
                    }
                }

                if( !(find[0] && find[1]) )
                    token[3] = false // if not found

                }
            }

            return (token[0]&&token[1]&&token[2]&&token[3])
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}