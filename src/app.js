const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000


//define path express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))


app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'İzmir'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Ugur'
    })
} )

app.get('/help',(req,res) => {
    res.render('help',{
        helpText:'This is some help text',
        title:'Help',
        name:'Ugur'
    })
}) 

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
        
    })

   
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Ugur',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Ugur',
        errorMesaage:'Page not found'       
    })  
})

//app.com
//app.com/help
//app.com/about

app.listen(port,() => {
    console.log('Server is up on port' + port)
})