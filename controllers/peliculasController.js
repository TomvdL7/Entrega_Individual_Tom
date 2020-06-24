let db = require("../database/models");


let peliculasController = {
    crear: function(req,res) {
        db.genero.findAll()
            .then(function(generos){
                return res.render("creacionPeliculas", {generos:generos});
            })
    },
    guardado: function(req, res){
        db.pelicula.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        });

        res.redirect("/peliculas")
    },

    listado: function(req, res){
        db.pelicula.findAll()
            .then(function(peliculas){
                res.render("listadoPeliculas", {peliculas:peliculas});
            })
    },

    detalle: function(req,res){
        db.pelicula.findByPk(req.params.id, {
            include: [{association: "genero"}, {association: "actores"}]
        })
            .then(function(pelicula){
                res.render("detallePelicula", {pelicula:pelicula});
            })
    },
    
    editar: function(req,res){
        let pedidoPelicula = db.pelicula.findByPk(req.params.id);

        let pedidoGeneros = db.genero.findAll();

        Promise.all([pedidoPelicula, pedidoGeneros])
            .then(function([pelicula, genero]){
                res.render("editarPelicula", {pelicula:peliculas, generos:generos});
            })
    },

    actualizar: function(req, res){
        db.pelicula.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.fecha_estreno,
            genre_id: req.body.genero,
            length: req.body.duracion,
            rating: req.body.rating
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/peliculas/" + req.params.id)
    },

    borrar: function(req,res){
        db.pelicula.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/peliculas");
    }

};

module.exports = peliculasController;