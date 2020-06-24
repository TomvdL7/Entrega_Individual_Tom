module.exports = function(sequelize, dataTypes){
    let alias = "actor";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncriment: true,

        },
        first_name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        length:{
            type: dataTypes.INTEGER
        },
        genre_id:{
            type: dataTypes.INTEGER
        },
        release_date:{
            type: dataTypes.DATE
        }

    }
    
    let config = {
        tableName: "actors",
        timestamps: false
    }

    let actor = sequelize.define(alias, cols,config);

    actor.associate = function(models){
        actor.belongsToMany(models.pelicula, {
            as: "peliculas",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
            timestamps: false
        });
    }

    return actor;
}